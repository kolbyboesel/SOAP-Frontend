import React, { useState, useContext } from 'react';
import { UserSettingsContext } from '../components/UserSettings';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { updateUserSettings } = useContext(UserSettingsContext);
  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    email: '',
    repeatEmail: '',
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
  });

  const [signupPressed, setSignupPressed] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupPressed(true);
    setError('');

    if (signupData.email !== signupData.repeatEmail) {
      setError('Emails do not match');
      setSignupPressed(false);
      return;
    }

    if (signupData.password !== signupData.repeatPassword) {
      setError('Passwords do not match');
      setSignupPressed(false);
      return;
    }

    try {
      const response = await axios.post('https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/api/userSettings/register', signupData);

      if (response.status === 200) {
        const userSettings = response.data;
        updateUserSettings(userSettings);
        navigate('/Account');
      } else {
        setError('Signup failed: Invalid information');
      }
    } catch (error) {
      setError('An error occurred while signing up. Please try again later.');
    } finally {
      setSignupPressed(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '5%' }}>
      <form className="modal-content animate mobileScreen" onSubmit={handleSignupSubmit}>
        <div className="container pt-5 h-auto">
          <label className="left-align" htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="repeatEmail">
            <b>Repeat Email</b>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Repeat Email"
            id="repeatEmail"
            name="repeatEmail"
            value={signupData.repeatEmail}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="firstName">
            <b>First Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            id="firstName"
            name="firstName"
            value={signupData.firstName}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="lastName">
            <b>Last Name</b>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            id="lastName"
            name="lastName"
            value={signupData.lastName}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="password">
            <b>Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter Password"
            id="password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            required
          />

          <label className="left-align" htmlFor="repeatPassword">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            className="form-control"
            placeholder="Repeat Password"
            id="repeatPassword"
            name="repeatPassword"
            value={signupData.repeatPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" style={{ borderRadius: '5px' }} disabled={signupPressed}>
            {signupPressed ? 'Signing up...' : 'Signup'}
          </button>

          {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>

        <div className="container pb-5 login-cancel">
          <a href="/" className="cancelbtn" style={{ borderRadius: '5px' }}>
            Cancel
          </a>
          <span className="psw">
            Already have an account? <a href="/login">Login</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
