import React, { useContext } from 'react';
import { UserSettingsContext } from '../UserSettingsContext'; // Import the context

const Signout = () => {
  const { updateUserSettings } = useContext(UserSettingsContext); // Get updateUserSettings function from context

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

    // Redirect the user to the login page or home page (you can use react-router's navigate function)
    window.location.href = '/Login';  // Or use `navigate('/Login')` if you're using react-router
  };

  return (
    <div>
      <h2>Sign Out</h2>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Signout;