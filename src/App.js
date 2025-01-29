import './styles/App.css';
import './styles/Modals.css';
import './styles/Scoreboard.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from '../src/pages/Home';
import LiveScores from '../src/pages/LiveScores';
import Account from '../src/pages/Account';
import ChangePassword from './pages/AccountFunctions/ChangePassword';
import LeaguePage from '../src/pages/LeaguePage';
import TeamPage from '../src/pages/TeamPage';
import Signup from './pages/AccountFunctions/Signup';
import Login from './pages/AccountFunctions/Login';
import EventInfo from '../src/pages/EventInfo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserSettingsProvider } from '../src/components/UserSettings';

const App = () => {
  return (
    <UserSettingsProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LiveScores" element={<LiveScores />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/EventInfo" element={<EventInfo />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/LeaguePage" element={<LeaguePage />} />
          <Route path="/TeamPage" element={<TeamPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </UserSettingsProvider>
  );
};

export default App;