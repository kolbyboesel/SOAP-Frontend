import React, { useContext, useEffect, useState } from 'react';
import { UserSettingsContext } from '../../src/components/UserSettings';


const FavoritesView = () => {
  const { userSettings } = useContext(UserSettingsContext); 
  const [settings, setSettings] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    isLoggedIn: false,
  });

  useEffect(() => {
    if (userSettings) {
      setSettings(userSettings); 
    }
  }, [userSettings]);

  return (
    <div>
      <h2>Favorites View</h2>
      <div>
        <strong>User ID:</strong> {settings.userId || 'N/A'}
      </div>
      <div>
        <strong>First Name:</strong> {settings.firstName || 'N/A'}
      </div>
      <div>
        <strong>Last Name:</strong> {settings.lastName || 'N/A'}
      </div>
      <div>
        <strong>Logged In:</strong> {settings.isLoggedIn ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default FavoritesView;