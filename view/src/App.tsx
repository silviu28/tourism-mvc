/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, type FunctionComponent } from 'react'
import './App.css';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import Signup from './components/Signup';
import PriceTable from './components/PriceTable';
import Contact from './components/Contact';
import axios from 'axios';
import Login from './components/LoginPage';
import type { UserData } from './types';
import UserContext from './UserContext';
import Alert from './components/Alert';
import AdminPanel from './components/AdminPanel';
import Gallery from './components/Gallery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AlertContext from './AlertContext';
import BlogPosts from './components/BlogPosts';
import styled from 'styled-components';
import Footer from './components/Footer';
import Wiki from './components/Wiki';
import NotFound from './components/NotFound';
import ExpandedBlogPost from './components/ExpandedBlogPost';
import ManagePrices from './components/AdminPanel/ManagePrices';
import ManageGallery from './components/AdminPanel/ManageGallery';
import ManageFeedback from './components/AdminPanel/ManageFeedback';
import ManageNotifications from './components/AdminPanel/ManageNotifications';
import ManageBlog from './components/AdminPanel/ManageBlog';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4004";

const queryClient = new QueryClient();

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`flex: 1;`;

const App: FunctionComponent = () => {
  const [user, setUser] = useState<UserData>(() => JSON.parse(localStorage.getItem('user') || "{}"));
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertContent, setAlertContent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // check for admin authorization for conditional rendering of admin panel
  useEffect(() => {
    const fetchAsync = async () => {
      try {
        const adminRes = await axios.get("http://localhost:4004/api/admin/auth");
        if (adminRes.data) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchAsync();
  });

  const showAlert = (content: string, title: string, error: boolean) => {
    setAlertContent(content);
    if (title) setAlertTitle(title);
    if (error) setIsError(error);

    setTimeout(() => {
      setAlertContent("");
      setAlertTitle("");
      setIsError(false);
    }, 5000);
  };

  const createAccount = async (data: any) => {
    try {
      console.log(data);
      await axios.post('http://localhost:4004/api/users', data);
      showAlert("Succesfully created account", "", false);
    } catch (_error) {
      showAlert("Unable to create account", "", true);
    }
  };

  const login = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:4004/api/login", data);
      showAlert("Login succesful", "", false);
      setUser({
        id: res.data.id,
        username: res.data.username
      });
      localStorage.setItem('user', JSON.stringify({
        id: res.data.id,
        username: res.data.username
      }));
    } catch (_error) {
      showAlert("Login failed", "", true);
    }
  };

  const addFeedback = async (feedback: string) => {
    try {
      await axios.post("http://localhost:4004/api/feedback", {
        feedback
      });
      showAlert("Feedback added", "", false);
    } catch (_error) {
      showAlert("Unable to add your feedback", "", true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AlertContext.Provider value={showAlert}>
        <UserContext.Provider value={[user, setUser]}>
          <AppWrapper>
            <Router>
              <Content>
               <Alert
                  title={alertTitle}
                  content={alertContent}
                  error={isError}
                />

                <Navbar isAdmin={isAdmin} />
              </Content>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" element={<FrontPage />} />
                <Route path="/signup" element={<Signup onSubmit={createAccount} />} />
                <Route path="/wiki" element={<Wiki />} />
                <Route path="/prices" element={<PriceTable />} />
                <Route path="/contact" element={<Contact onSubmit={addFeedback} />} />
                <Route path="/login" element={<Login onSubmit={login} />} />
                {isAdmin && (
                  <Route path="/admin" element={<AdminPanel />}>
                    <Route index element={<h1 style={{ textAlign: "center" }}>Select something from the left.</h1>} />
                    <Route path="prices" element={<ManagePrices />} />
                    <Route path="gallery" element={<ManageGallery />} />
                    <Route path="feedback" element={<ManageFeedback />} />
                    <Route path="notifications" element={<ManageNotifications />} />
                    <Route path="blog" element={<ManageBlog />} />
                  </Route>
                )}
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<BlogPosts />} />
                <Route path="/blog/:id" element={<ExpandedBlogPost />} />
              </Routes>
            </Router>
            <Footer />
          </AppWrapper>
        </UserContext.Provider>
      </AlertContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
