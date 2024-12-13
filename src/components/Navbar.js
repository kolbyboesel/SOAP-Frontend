import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserSettingsContext } from './UserSettings';
import '../styles/Navbar.css';

const Navbar = () => {
  const { userSettings } = useContext(UserSettingsContext);
  const [settings, setSettings] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    isLoggedIn: false,
  });

  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    if (userSettings) {
      setSettings(userSettings);
    }
  }, [userSettings]);

  const toggleNavbar = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  const { updateUserSettings } = useContext(UserSettingsContext);

  const defaultSettings = {
    loginID: 'defaultUser@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false
  };

  const handleSignOut = () => {
    updateUserSettings(defaultSettings);

    localStorage.removeItem('userSettings');

    window.location.href = '/';
  };

  return (
    <nav className="site-navbar navbar navbar-expand-lg navbar-dark navmenu">
      <Link className="navbar-brand" to="/" style={{ position: 'relative', left: '15px', fontFamily: "'AvenirNext-DemiBoldItalic'" }}>
        SOAP
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarNavDropdown"
        aria-expanded={isNavOpen ? 'true' : 'false'}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarNavDropdown">
        <ul className="navbar-nav">
          <div className="center-container">
            <li id="home-item" className="nav-item">
              <NavLink
                id="home-link"
                className="nav-link"
                to="/"
                onClick={closeNavbar}
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li id="live-item" className="nav-item">
              <NavLink
                id="live-link"
                className="nav-link"
                to="/LiveScores"
                onClick={closeNavbar}
                activeClassName="active"
              >
                Live Scores
              </NavLink>
            </li>
            <li id="live-item" className="nav-item">
              <NavLink
                id="live-link"
                className="nav-link"
                to="/Favorites"
                onClick={closeNavbar}
                activeClassName="active"
              >
                Favorites
              </NavLink>
            </li>
          </div>

          <div className="right-container">
            {settings.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={handleSignOut}
                    activeClassName="active"
                  >
                    Sign Out
                  </a>
                </li>


                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Account"
                    onClick={closeNavbar}
                    activeClassName="active"
                  >
                    Account
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Signup"
                    onClick={closeNavbar}
                    activeClassName="active"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/Login"
                    onClick={closeNavbar}
                    activeClassName="active"
                  >
                    Log In
                  </NavLink>
                </li>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;