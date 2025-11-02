import { useContext, type FC } from "react";
import { Link } from "react-router";
import './style.css';
import UserContext from "../../UserContext";
import { type UserData } from "../../types";
import axios from "axios";

interface NavbarProps {
  isAdmin: boolean;
};

const Navbar: FC<NavbarProps> = ({ isAdmin }) => {
  const [user, setUser]: any = useContext<UserData>(UserContext);

  const promptLogout = async () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem('user');
      setUser({});
      await axios.post("http://localhost:4004/logout");
    }
  };

  return (
    <div className="header">

      <ul className="navigation-flex">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        {isAdmin &&
          <li><Link to="/admin">Admin</Link></li>}
      </ul>
      {user.username &&
        <li>
          <a onClick={promptLogout}>Welcome, {user.username}!</a>
        </li>
      }
    </div>
  );
};

export default Navbar;