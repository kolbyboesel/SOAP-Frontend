import React, { useState, useContext } from 'react';
import { UserSettingsContext } from '../components/UserSettings'; // Import UserSettingsContext
import { useNavigate } from 'react-router-dom'; // Make sure useNavigate is imported
import axios from 'axios';

const Login = () => {
  const { updateUserSettings } = useContext(UserSettingsContext); // Get updateUserSettings from context
  const navigate = useNavigate(); // Initialize useNavigate
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
      // Use Axios to send login data to the backend
      const response = await axios.post('https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userSettings/confirmLogin', loginData);

      if (response.status === 200) {
        const userSettings = response.data;
        updateUserSettings(userSettings); // Update the user settings in the context
        navigate('/Account'); 
      } else {
        setError('Login failed: Invalid credentials');
      }
    } catch (error) {
      setError('An error occurred while logging in. Please try again later.');
    } finally {
      setLoginPressed(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '15%' }}>
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

          <button type="submit" style={{ borderRadius: '5px' }} disabled={loginPressed}>
            {loginPressed ? 'Logging in...' : 'Login'}
          </button>

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>

        <div className="container pb-5 login-cancel">
          <a href="/" className="cancelbtn" style={{ borderRadius: '5px' }}>
            Cancel
          </a>
          <span className="psw">
            Forgot <a href="/">password?</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;