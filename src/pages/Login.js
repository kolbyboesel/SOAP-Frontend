import React, { useState, useContext } from 'react';
import { UserSettingsContext } from '../../src/components/UserSettings';

const Login = () => {
  const { updateUserSettings } = useContext(UserSettingsContext);

  // State to manage form inputs
  const [userId, setUserId] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Set the user settings object
    const newSettings = {
      userId,
      firstName,
      lastName,
      isLoggedIn: true, 
    };

    // Call updateUserSettings to send data to the backend
    await updateUserSettings(newSettings);

    // Set isLoggedIn to true after successful login
    setIsLoggedIn(true);
  };

  return (
    <div>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div>
            <label>User ID:</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login and Update Settings</button>
        </form>
      ) : (
        <div>
          <h2>Welcome! You are logged in.</h2>
        </div>
      )}
    </div>
  );
};

export default Login;