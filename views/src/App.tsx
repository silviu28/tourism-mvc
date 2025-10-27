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


const App: FunctionComponent = () => {
  const createAccount = async data => {
    const res = await axios.post('http://localhost:4004/users', data);
  };
  const login = async data => {
    const res = await axios.put('http://localhost:4004/users', data);
    if (res.data.id && res.data.username && res.data.token) {
      localStorage.setItem('user', JSON.stringify({
        id: res.data.id,
        username: res.data.username,
        token: res.data.token,
      }));
    }
  };

  const [user, setUser] = useState<UserData>(() => JSON.parse(localStorage.getItem('user') || "{}"));

  return (
    <UserContext.Provider value={user}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/signup" element={<Signup onSubmit={createAccount} />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/prices" element={<PriceTable />} />
          <Route path="/contact" element={<Contact onSubmit={() => { }} />} />
          <Route path="/login" element={<Login onSubmit={login} />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App
