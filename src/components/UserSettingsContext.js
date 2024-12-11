import React, { createContext, useState, useEffect } from 'react';
import { UserSettingsContext } from './UserSettings';

const UserSettingsContext = createContext();

const UserSettingsProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState(null);

  // Default settings
  const defaultSettings = {
    userId: 'defaultUser',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false,
  };

  useEffect(() => {
    // Simulate fetching user settings from an API or localStorage
    const fetchUserSettings = async () => {
      // Check if settings exist in localStorage
      const savedSettings = JSON.parse(localStorage.getItem('userSettings'));

      if (savedSettings) {
        // If settings are found in localStorage, use them
        setUserSettings(savedSettings);
      } else {
        // Otherwise, use default settings
        setUserSettings(defaultSettings);
      }
    };

    fetchUserSettings();
  }, []);

  const updateUserSettings = async (settings) => {
    setUserSettings(settings);
    localStorage.setItem('userSettings', JSON.stringify(settings)); // Save settings in localStorage
  };

  return (
    <UserSettingsContext.Provider value={{ userSettings, updateUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};

export { UserSettingsProvider, UserSettingsContext };