
import axios from 'axios';
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [weather ,setweater] = useState({});
  const [celcius ,setCelcius]=useState(false);

  useEffect(() => {

    const succes = pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0c6fc1e3b9e1a46182bd58ce42635c6b`)
    .then(res => setweater(res.data));
    }

    navigator.geolocation.getCurrentPosition(succes);

  }, []);

  const getCelcius = (() => {
      setCelcius(!celcius);
  })

  return (
    <div className="App">
      <div className='cardWeather'> 
        <div className='location'>
          <p> <b>City:</b> {weather?.name},{weather.sys?.country} </p>
          <h2>{weather.weather?.[0].description}</h2>
        </div> 
        <div className='weather'>
          <div className='weather1'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}.png`} alt={weather.weather?.[0].description} />
            <p><b>Temperature: </b>
            {celcius?(Math.round(weather.main?.temp-273.15) ):(Math.round(weather.main?.temp))} {' '}
            {celcius?'°C':'°K'}
             </p>
          </div>
          <div className='weather2'>
            <p><b>Humidity: </b>{weather.main?.humidity}%</p>
            <p><b>Clouds: </b>{ weather.clouds?.all}%</p>
            <p><b>Visibility: </b>{weather.visibility/1000}km</p>
            <div className='temp-max-min'>
              <p><b>Temperature MIN:</b>{' '}
              {celcius ? (Math.round(weather.main?.temp_min-273.15)) : (Math.round(weather.main?.temp_min)) } {' '}
              {celcius ? '°C' : '°K'}
              </p>
              <p><b>Temperature MAX:</b>{' '}
              {celcius ? (Math.round(weather.main?.temp_max-273.15)) : (Math.round(weather.main?.temp_max))} {' '}
              {celcius ? '°C' : '°K'}
              </p>
            </div>
          </div>
        </div>
        <div className='button'>
          <button onClick={getCelcius}>{celcius ? 'Change Kelvin' : 'Change Celcius'}</button>
        </div>
      </div>
    </div>
  )
}

export default App
