import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from '../src/pages/Home';
import LiveScores from '../src/pages/LiveScores';
import FavoritesView from '../src/pages/FavoritesView';
import Contact from '../src/pages/Contact';
import Signout from '../src/pages/Signout';
import ChangeEmail from '../src/pages/ChangeEmail';
import ChangePassword from '../src/pages/ChangePassword';
import Signup from '../src/pages/Signup';
import Login from '../src/pages/Login';
import UnderConstructionModal from "./components/UnderConstructionModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { UserSettingsProvider } from '../src/components/UserSettings'; // Import UserSettingsProvider

const App = () => {
  return (
    <UserSettingsProvider>
      <Router>
        <UnderConstructionModal />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LiveScores" element={<LiveScores />} />
          <Route path="/FavoritesView" element={<FavoritesView />} />
          <Route path="/ContactModal" element={<Contact />} />
          <Route path="/Signout" element={<Signout />} />
          <Route path="/ChangeEmail" element={<ChangeEmail />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </Router>
    </UserSettingsProvider>
  );
};

export default App;