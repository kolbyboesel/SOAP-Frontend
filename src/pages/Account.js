import React, { useContext, useEffect, useState } from 'react';
import { UserSettingsContext } from '../../src/components/UserSettings';


const Account = () => {
  const { userSettings } = useContext(UserSettingsContext);
  const [settings, setSettings] = useState({
    loginID: '',
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
      <h2>Account</h2>
      <div>
        <strong>Email:</strong> {settings.loginID || 'N/A'}
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

export default Account;