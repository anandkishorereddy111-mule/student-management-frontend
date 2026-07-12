import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__logo">
        <span className="nav__logo-glyph">{'</>'}</span> PJN Technologies
      </NavLink>
      <div className="nav__links">
        <NavLink to="/" end className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/courses" className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}>
          Courses
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav__link${isActive ? " is-active" : ""}`}>
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;