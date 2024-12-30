import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/pages/Home';
import LiveScores from '../src/pages/LiveScores';
import Account from '../src/pages/Account';
import Favorites from '../src/pages/Favorites';
import ChangeEmail from '../src/pages/ChangeEmail';
import ChangePassword from '../src/pages/ChangePassword';
import LeaguePage from '../src/pages/LeaguePage';
import TeamPage from '../src/pages/TeamPage';
import Signup from '../src/pages/Signup';
import Login from '../src/pages/Login';
import EventInfo from '../src/pages/EventInfo';
import UnderConstructionModal from "./components/UnderConstructionModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserSettingsProvider } from '../src/components/UserSettings';

const App = () => {
  return (
    <UserSettingsProvider>
      <Router>
        <UnderConstructionModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LiveScores" element={<LiveScores />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/Favorites" element={<Favorites />} />
          <Route path="/EventInfo" element={<EventInfo />} />
          <Route path="/ChangeEmail" element={<ChangeEmail />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/LeaguePage" element={<LeaguePage />} />
          <Route path="/TeamPage" element={<TeamPage />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </UserSettingsProvider>
  );
};

export default App;