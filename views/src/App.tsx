import { type FunctionComponent } from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';
import Signup from './components/Signup';
import TripsPage from './components/TripsPage';
import PriceTable from './components/PriceTable';
import Contact from './components/Contact';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/signup" element={<Signup onSubmit={() => { }} />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/prices" element={<PriceTable />} />
        <Route path="/contact" element={<Contact onSubmit={() => { }} />} />
      </Routes>
    </Router>
  );
};

export default App
