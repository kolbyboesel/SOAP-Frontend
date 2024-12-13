import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';

export const UserSettingsContext = createContext();

export const UserSettingsProvider = ({ children }) => {
  const [userSettings, setUserSettings] = useState(null);

  const defaultSettings = useMemo(() => ({
    loginID: 'defaultUser@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false,
  }), []);

  const fetchUserSettings = useCallback(async () => {
    try {
      const response = await fetch('/api/usersettings');
      if (response.ok) {
        const settings = await response.json();
        setUserSettings(settings);
      } else {
        console.error('Failed to fetch user settings, using default settings.');
        setUserSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error occurred while fetching user settings:', error);
      setUserSettings(defaultSettings);
    }
  }, [defaultSettings]);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const updateUserSettings = (settings) => {
    try {
      setUserSettings(settings);
      settings.isLoggedIn = true;

      localStorage.setItem('userSettings', JSON.stringify(settings));

      console.log('User settings updated locally');
    } catch (error) {
      console.error('Error occurred while updating user settings locally:', error);
    }
  };

  const settingsToProvide = userSettings || defaultSettings;

  return (
    <UserSettingsContext.Provider value={{ userSettings: settingsToProvide, updateUserSettings }}>
      {children}
    </UserSettingsContext.Provider>
  );
};