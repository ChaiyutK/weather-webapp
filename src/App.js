import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  AOS.init({duration: 2000});
  const [data,setData] = useState({});
  const [city,setCity] = useState("");
  const [date,setDate] = useState("");
  

  const search = (e) =>{
    if(e.key === "Enter")
    {
      getData();
      setCity("");
      if ( document.getElementById("tempid").classList.contains('tempactive') )
      {
        document.getElementById("tempid").classList.remove('tempactive')
      }
      else{
        document.getElementById("tempid").classList.add('tempactive')
      }
    }
  
  }

  const getData = (e) =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res=>{
        setData(res.data)
        setDate(new Date().toLocaleString().slice(0,9));
      })
  }
 
  


  return (
    <div className={typeof data.name != "undefined" && data.main.temp > 20 ? "App hot" : typeof data.name != "undefined" && data.main.temp < 12 ? "App cold" : "App"}>
      <div className='weather-box'>
        <div className="weather-item">
        <input placeholder='Enter City Name' type="text" onChange={(event) => {setCity(event.target.value)}} value={city} onKeyPress={search} />
        </div>
      {(typeof data.name != "undefined" ? (
        <>
        <div className="weather-item" data-aos="flip-up"><h2 className='cityname'>{data.name},{data.sys.country}</h2></div>
          <div className="weather-item" data-aos="flip-up"><h2 className='date'>{date}</h2></div>
          <div className="weather-item" data-aos="flip-up"><h2 id='tempid' className='temp'>{data.main.temp} °C</h2></div>
          <div className="weather-item" data-aos="flip-up"><h2 className='cloud'>{data.weather[0].main}</h2></div>
        </>
      ) : "")}
      </div>
    </div>  
  );
}

export default App;
