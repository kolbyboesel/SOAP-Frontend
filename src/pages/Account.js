import React, { useContext, useEffect, useState } from 'react';
import { UserSettingsContext } from '../../src/components/UserSettings';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import axios from 'axios'; // Ensure axios is also imported
import '../styles/Account.css';

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
    userId: 'defaultUser',
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
        // Use Axios to send DELETE request to the backend to delete the user
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

  return (
    <div className="container pt-3 pb-3">
      <div className="account-header">
        <h2>Account Settings</h2>
        <p>View and update your account details</p>
      </div>
      <div className="account-details">
        <div className="account-item">
          <strong>Email:</strong> <span>{settings.loginID || 'N/A'}</span>
        </div>
        <div className="account-item">
          <strong>First Name:</strong> <span>{settings.firstName || 'N/A'}</span>
        </div>
        <div className="account-item">
          <strong>Last Name:</strong> <span>{settings.lastName || 'N/A'}</span>
        </div>
      </div>

      <div className="account-favorites">
        <h3>Your Favorite Leagues</h3>
        {settings.LeagueFavorites && settings.LeagueFavorites.length > 0 ? (
          <ul>
            {settings.LeagueFavorites.map((favorite, index) => (
              <li key={index}>{favorite.sportName}</li>
            ))}
          </ul>
        ) : (
          <p>No favorite leagues.</p>
        )}
      </div>

      <div className="account-favorites">
        <h3>Your Favorite Teams</h3>
        {settings.TeamFavorites && settings.TeamFavorites.length > 0 ? (
          <ul>
            {settings.TeamFavorites.map((favorite, index) => (
              <li key={index}>{favorite.name}</li>
            ))}
          </ul>
        ) : (
          <p>No favorites teams.</p>
        )}
      </div>

      <div className="container">
        <button className="account-btn" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Account;