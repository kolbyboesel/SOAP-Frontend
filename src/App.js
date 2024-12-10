import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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




export default App;
