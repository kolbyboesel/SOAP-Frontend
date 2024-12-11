import './styles/App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import FavoritesView from './pages/FavoritesView';
import Contact from './pages/Contact';
import Signout from './pages/Signout';
import ChangeEmail from './pages/ChangeEmail';
import ChangePassword from './pages/ChangePassword';
import Signup from './pages/Signup';
import Login from './pages/Login'
import UnderConstructionModal from "./components/UnderConstructionModal";

const App = () => {
  return (
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
  );
};

export default App;

/*
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://soapscores-dvbnchand2byhvhc.centralus-01.azurewebsites.net/weatherforecast') // Adjust based on your API route
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div> 
      <h1>Weather Forecast</h1>
      <ul>
        {data.map(item => (
          <li key={item.date}>{item.summary}</li>
        ))}
      </ul>
    </div>
  );
}
*/



