import type { FunctionComponent } from "react";
import { Link } from "react-router";
import './style.css';

const Navbar: FunctionComponent = () => {
  return (
    <div className="header">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/trips">Trips</Link></li>
        <li><Link to="/prices">Prices</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li>
          <img src={"public/images/thumbnail.png"}
            style={{ "width": "2vw", "height": "2vw" }} />
        </li>
      </ul>
    </div>
  );
};

export default Navbar;