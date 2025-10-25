import { type FunctionComponent } from 'react'
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

const App: FunctionComponent = () => {
  const createAccount = async data => {
    const res = await axios.post('http://localhost:4004/users', data);
  };
  const login = async data => {
    const res = await axios.put('http://localhost:4004/users', data);
  };

  return (
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
  );
};

export default App
