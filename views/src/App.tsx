import { createContext, useState, type FunctionComponent } from 'react'
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



const App: FunctionComponent = () => {
  const [user, setUser] = useState<UserData>(() => JSON.parse(localStorage.getItem('user') || "{}"));
  const [alertTitle, setAlertTitle] = useState<string>("");
  const [alertContent, setAlertContent] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

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

  const createAccount = async data => {
    try {
      console.log(data);
      const res: any = await axios.post('http://localhost:4004/users', data);
      if (res.data.error) {
        showAlert("nope", "account create failed", true);
      }
    } catch (error) {
      showAlert("nope", "", true);
    }
  };

  const login = async data => {
    try {
      const res: any = await axios.put('http://localhost:4004/users', data);
      if (res.data.id && res.data.username && res.data.token) {
        localStorage.setItem('user', JSON.stringify({ ...res.data }));
        setUser({ ...res.data });
      }
    } catch (error) {
      showAlert("nope", "", true);
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Alert
          title={alertTitle}
          content={alertContent}
          error={isError}
        />
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<Signup onSubmit={createAccount} />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/prices" element={<PriceTable prices={[]} />} />
          <Route path="/contact" element={<Contact onSubmit={() => { }} />} />
          <Route path="/login" element={<Login onSubmit={login} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
