import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { UserSettingsContext } from './UserSettings';
import '../styles/Navbar.css';
import classNames from 'classnames';

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
            <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
              <li id="home-item" className="nav-item">
                <NavLink
                  id="home-link"
                  className={({ isActive }) => classNames("nav-link", { active: isActive })}
                  to="/"
                  onClick={closeNavbar}
                >
                  Home
                </NavLink>
              </li>
              <li id="live-item-1" className="nav-item">
                <NavLink
                  id="live-link-1"
                  className={({ isActive }) => classNames("nav-link", { active: isActive })}
                  to="/LiveScores"
                  onClick={closeNavbar}
                >
                  Live Scores
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="right-container">
            {settings.isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a
                    href="/"
                    className="nav-link"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </a>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => classNames("nav-link", { active: isActive })}
                    to="/Account"
                    onClick={closeNavbar}
                  >
                    Account
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => classNames("nav-link", { active: isActive })}
                    to="/Signup"
                    onClick={closeNavbar}
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) => classNames("nav-link", { active: isActive })}
                    to="/Login"
                    onClick={closeNavbar}
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