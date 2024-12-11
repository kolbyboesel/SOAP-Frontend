import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Import NavLink for active class functionality
import { UserSettingsContext } from './UserSettings';

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

  // Collapse the navbar when a nav item is clicked
  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  const { updateUserSettings } = useContext(UserSettingsContext); 

  // Default settings for user
  const defaultSettings = {
    userId: 'defaultUser',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false,
    UserFavorites: [],
    TeamFavorites: [],
  };

  const handleSignOut = () => {
    // Reset user settings to default
    updateUserSettings(defaultSettings);

    // Clear the settings from localStorage
    localStorage.removeItem('userSettings');

    window.location.href = '/';  
  };

  return (
    <nav className="site-navbar navbar navbar-expand-lg navbar-dark BackgroundNorm">
      <Link className="navbar-brand" to="/" style={{ position: 'relative', left: '15px', fontFamily: "'AvenirNext-DemiBoldItalic'" }}>
        SOAP
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}  // Toggle the state when clicked
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
                activeClassName="active"  // Add active class when on this route
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
                activeClassName="active"  // Add active class when on this route
              >
                Live Scores
              </NavLink>
            </li>
            <li id="fav-item" className="nav-item">
              <NavLink 
                id="fav-link" 
                className="nav-link" 
                to="/FavoritesView" 
                onClick={closeNavbar} 
                activeClassName="active"  // Add active class when on this route
              >
                Favorites
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className="nav-link" 
                to="/ContactModal" 
                onClick={closeNavbar} 
                activeClassName="active"  // Add active class when on this route
              >
                Contact
              </NavLink>
            </li>
          </div>

          <div className="right-container">
            {settings.isLoggedIn ? (
              <>
                <li className="nav-item">
                <button className="nav-link"  
                onClick={handleSignOut}
                activeClassName="active">Sign Out</button>
                </li>
                <li className="nav-item dropdown">
                  <NavLink 
                    className="nav-link dropdown-toggle" 
                    to="#" 
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={closeNavbar}
                  >
                    Account
                  </NavLink>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <NavLink 
                      className="dropdown-item" 
                      to="/ChangeEmail" 
                      onClick={closeNavbar} 
                      activeClassName="active"
                    >
                      Change Email
                    </NavLink>
                    <NavLink 
                      className="dropdown-item" 
                      to="/ChangePassword" 
                      onClick={closeNavbar} 
                      activeClassName="active"
                    >
                      Change Password
                    </NavLink>
                    <NavLink 
                      className="dropdown-item" 
                      to="#" 
                      onClick={closeNavbar} 
                      activeClassName="active"
                    >
                      Delete Account
                    </NavLink>
                  </div>
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