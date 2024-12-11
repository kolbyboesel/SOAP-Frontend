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
import Login from '../src/pages/Login'
import UnderConstructionModal from "./components/UnderConstructionModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

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



