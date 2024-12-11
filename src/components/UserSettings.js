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

  const updateUserSettings = async (settings) => {
    try {
      const response = await fetch('/api/usersettings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setUserSettings(settings); // Update settings in context
      } else {
        console.error('Failed to update user settings');
      }
    } catch (error) {
      console.error('Error occurred while updating user settings:', error);
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