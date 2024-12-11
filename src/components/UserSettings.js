import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const UserSettingsContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState(null);

  // Memoize defaultSettings to avoid unnecessary re-creations
  const defaultSettings = useMemo(() => ({
    userId: 'defaultUser',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false,
  }), []);  // Empty array ensures this object is memoized only once

  // Wrap fetchUserSettings in useCallback to ensure it's stable
  const fetchUserSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/usersettings');
      if (response.ok) {
        const settings = await response.json();
        setUserSettings(settings); // Set the fetched settings
      } else {
        console.error('Failed to fetch user settings, using default settings.');
        setUserSettings(defaultSettings); // Fallback to default settings if fetch fails
      }
    } catch (error) {
      console.error('Error occurred while fetching user settings:', error);
      setUserSettings(defaultSettings); // Fallback to default settings if there's an error
    }
  }, [defaultSettings]);  // Include defaultSettings in the dependencies of useCallback

  useEffect(() => {
    fetchUserSettings(); // Fetch user settings when the app loads
  }, [fetchUserSettings]);  // Add fetchUserSettings to the dependency array

  const updateUserSettings = (settings) => {
    try {
      // Update user settings in the context (state)
      setUserSettings(settings);
      settings.isLoggedIn = true; 
  
      // Save the updated settings in localStorage
      localStorage.setItem('userSettings', JSON.stringify(settings));
      
      console.log('User settings updated locally');
    } catch (error) {
      console.error('Error occurred while updating user settings locally:', error);
    }
  };

  // If userSettings is null, we return default settings while the fetch is ongoing.
  const settingsToProvide = userSettings || defaultSettings;

  return (
    <UserSettingsContext.Provider value={{ userSettings: settingsToProvide, updateUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};