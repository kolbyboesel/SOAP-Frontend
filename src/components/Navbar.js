import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Assuming you have a method to get the current user settings, or it can come from props or context
  const [userSettings, setUserSettings] = useState({
    LoggedIn: false,
  });

  useEffect(() => {
    // Example of setting userSettings (e.g., from localStorage, Context API, etc.)
    const user = {
      LoggedIn: true, // Change this logic based on your app's state
    };
    setUserSettings(user);
  }, []);

  return (
    <nav className="site-navbar navbar navbar-expand-lg navbar-dark BackgroundNorm">
      <Link className="navbar-brand" to="/" style={{ position: 'relative', left: '15px', fontFamily: "'AvenirNext-DemiBoldItalic'" }}>
        SOAP
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <div className="center-container">
            <li id="home-item" className="nav-item">
              <Link id="home-link" className="nav-link" to="/">Home</Link>
            </li>
            <li id="live-item" className="nav-item">
              <Link id="live-link" className="nav-link" to="/LiveScores">Live Scores</Link>
            </li>
            <li id="fav-item" className="nav-item">
              <Link id="fav-link" className="nav-link" to="/FavoritesView">Favorites</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ContactModal">Contact</Link>
            </li>
          </div>

          <div className="right-container">
            {userSettings.LoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signout">Sign Out</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Account
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link className="dropdown-item" to="/ChangeEmail">Change Email</Link>
                    <Link className="dropdown-item" to="/ChangePassword">Change Password</Link>
                    <Link className="dropdown-item" to="#">Delete Account</Link>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Log In</Link>
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