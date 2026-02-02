import { useContext, type FC } from "react";
import { Link } from "react-router";
import './style.css';
import UserContext from "../../UserContext";
import axios from "axios";
import AlertContext from "../../AlertContext";

interface NavbarProps {
  isAdmin: boolean;
};

const Navbar: FC<NavbarProps> = ({ isAdmin }) => {
  const [user, setUser] = useContext(UserContext);
  const showAlert = useContext(AlertContext);

  const promptLogout = async () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem('user');
      try {
        await axios.post("http://localhost:4004/api/logout");
        showAlert("Succesfully logged out", "", false);
        setUser!({});
      } catch (_error) {
        showAlert("Cannot logout", "", true);
      }
    }
  };

  return (
    <div className="header">

      <ul className="navigation-flex">
        <li><Link to="/">Home</Link></li>
        {!user!.username &&
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        }
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        {user!.username && isAdmin &&
          <li><Link to="/admin">Admin</Link></li>}
      </ul>
      {user!.username &&
        <li>
          <a onClick={promptLogout}>Welcome, {user!.username}!</a>
        </li>}
    </div>
  );
};

export default Navbar;