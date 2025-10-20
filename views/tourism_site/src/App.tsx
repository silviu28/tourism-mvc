import { type FunctionComponent } from 'react'
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Navbar from './components/Navbar';
import FrontPage from './components/FrontPage';

const App: FunctionComponent = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FrontPage />} />
        {/* <Route path="/" element={<Signup />} />
        <Route path="/" element={<TripsPage />} />
        <Route path="/" element={<PriceTable />} />
        <Route path="/" element={<Contact />} />
        <Route path="/" element={<Gallery />} /> */}
      </Routes>
    </Router>
  );
};

export default App
