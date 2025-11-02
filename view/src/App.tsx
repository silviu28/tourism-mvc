import { useEffect, useState, type FunctionComponent } from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import Signup from './components/Signup';
import TripsPage from './components/TripsPage';
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

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4004";

const queryClient = new QueryClient();

const App: FunctionComponent = () => {
  const [user, setUser] = useState<UserData>(() => JSON.parse(localStorage.getItem('user') || "{}"));
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertContent, setAlertContent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // check for admin authorization for conditional rendering of admin panel
  useEffect(() => {
    (async () => {
      try {
        const adminRes = await axios.get("http://localhost:4004/admin/auth");
        if (adminRes.data) {
          setIsAdmin(true);
        }
      } catch (error) { }
    })();
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
      await axios.post('http://localhost:4004/users', data);
      showAlert("Succesfully created account", "", false);
    } catch (error) {
      showAlert("", "", true);
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
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      showAlert("Login failed", "", true);
    }
  };

  const addFeedback = async (feedback: string) => {
    try {
      await axios.post("http://localhost:4004/api/feedback", {
        feedback
      });
      showAlert("Feedback added", "", false);
    } catch (error) {
      showAlert("Unable to add your feedback", "", true);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={[user, setUser, showAlert]}>
        <Router>
          <Alert
            title={alertTitle}
            content={alertContent}
            error={isError}
          />
          <Navbar isAdmin={isAdmin} />
          <Routes>
            <Route path="/" element={<FrontPage />} />
            <Route path="/signup" element={<Signup onSubmit={createAccount} />} />
            <Route path="/trips" element={<TripsPage />} />
            <Route path="/prices" element={<PriceTable prices={[]} />} />
            <Route path="/contact" element={<Contact onSubmit={addFeedback} />} />
            <Route path="/login" element={<Login onSubmit={login} />} />
            {isAdmin &&
              <Route path="/admin" element={<AdminPanel />} />}
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
