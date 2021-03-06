import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unAuthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-bar nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-bar nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-bar nav-link">Register</li>
        </Link>
      </>
    );
  };

  const AuthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-bar nav-link">Home</li>
        </Link>
        <Link to="/profile">
          <li className="nav-bar nav-link">Profile</li>
        </Link>
        <button
          type="button"
          className="btn btn-link nav-link nav-item"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand">Project Managment Tool</div>
        </Link>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!isAuthenticated ? unAuthenticatedNavbar() : AuthenticatedNavbar()}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
