import React, { useState, useContext } from 'react';
import { UserSettingsContext } from '../components/UserSettings';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

  const { updateUserSettings } = useContext(UserSettingsContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [loginPressed, setLoginPressed] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginPressed(true);
    setError('');

    try {
      const response = await axios.post(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userSettings/confirmLogin`, loginData);

      if (response.status === 200) {
        const userSettings = response.data;
        updateUserSettings(userSettings);

        const leagueFavoritesResponse = await axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userLeagueFavorites/${loginData.email}`);

        let leagueFavorites = [];
        if (leagueFavoritesResponse.status === 200) {
          leagueFavorites = leagueFavoritesResponse.data;
          console.log('User League Favorites:', leagueFavorites);
        }

        const teamFavoritesResponse = await axios.get(`https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userTeamFavorites/${loginData.email}`);

        let teamFavorites = [];
        if (teamFavoritesResponse.status === 200) {
          teamFavorites = teamFavoritesResponse.data;
          console.log('User Team Favorites:', teamFavorites);
        }

        // Update user settings with both league and team favorites
        const updatedUserSettings = {
          ...userSettings,
          LeagueFavorites: leagueFavorites,
          TeamFavorites: teamFavorites,  // Add the TeamFavorites here
        };

        updateUserSettings(updatedUserSettings);
        localStorage.setItem('userSettings', JSON.stringify(updatedUserSettings));

        navigate('/Account');
      } else {
        setError(response.data.message || 'Login failed: Invalid credentials');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred while logging in. Please try again later.');
      } else {
        setError('An error occurred while logging in. Please try again later.');
      }
    } finally {
      setLoginPressed(false);
    }
  };

  return (
    <div className="scroll-view">
      <form className="modal-content animate mobileScreen" onSubmit={handleLoginSubmit}>
        <div className="container pt-5 h-auto">
          <label className="left-align" htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            id="uname"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            id="psw"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />

          <button className="confirm-btn" type="submit" style={{ borderRadius: '5px' }} disabled={loginPressed}>
            {loginPressed ? 'Logging in...' : 'Login'}
          </button>

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>

        <div className="container pb-5 pt-3 login-cancel">
          <a href="/" className="cancelbtn" style={{ borderRadius: '5px' }}>
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;