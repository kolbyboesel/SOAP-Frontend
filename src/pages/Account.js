import React, { useContext, useEffect, useState } from 'react';
import { UserSettingsContext } from '../../src/components/UserSettings';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {


  const { updateUserSettings } = useContext(UserSettingsContext);
  const { userSettings } = useContext(UserSettingsContext);
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    loginID: '',
    firstName: '',
    lastName: '',
    isLoggedIn: false,
    LeagueFavorites: [],
    TeamFavorites: [],
  });

  const defaultSettings = {
    loginID: 'defaultUser',
    firstName: 'John',
    lastName: 'Doe',
    isLoggedIn: false,
    LeagueFavorites: [],
    TeamFavorites: [],
  };

  useEffect(() => {
    if (userSettings) {
      setSettings(userSettings);
    }
  }, [userSettings]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userSettings/delete/${settings.loginID}`);

        if (response.status === 200) {
          alert('Your account has been successfully deleted.');
          updateUserSettings(defaultSettings);
          localStorage.removeItem('userSettings');
          navigate('/');
          window.location.reload();
        } else {
          alert('Error deleting account: ' + response.data);
        }
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred while trying to delete your account. Please try again later.');
      }
    }
  };

  const handleEmailClick = () => {
    navigate('/ChangePassword');
  };

  return (
    <div className="scroll-view pt-3 pb-3">
      <div className="account-header">
        <h2>{settings.firstName || 'N/A'} {settings.lastName || 'N/A'}</h2>
        <p>{settings.loginID || 'N/A'}</p>
      </div>

      <div className="container" style={{ paddingTop: '50px' }}>
        <button onClick={handleEmailClick}>
          Change Password
        </button>
      </div>

      <div className="container" style={{ paddingTop: '50px' }}>
        <button className="account-delete-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;