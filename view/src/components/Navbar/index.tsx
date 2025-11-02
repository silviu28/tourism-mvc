import { useContext, type FC } from "react";
import { Link } from "react-router";
import './style.css';
import UserContext from "../../UserContext";
import { type UserData } from "../../types";

interface NavbarProps {
  isAdmin: boolean;
};

const Navbar: FC<NavbarProps> = ({ isAdmin }) => {
  const [user, setUser]: any = useContext<UserData>(UserContext);

  const promptLogout = () => {
    if (window.confirm("Logout?")) {
      localStorage.removeItem('user');
      setUser({});
    }
  };

  return (
    <div className="header">
      <li>
        <img src="/vite.svg"
          style={{ "width": "2vw", "height": "2vw" }} />
      </li>

      <ul className="navigation-flex">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
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