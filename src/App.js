import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [data,setData] = useState({});
  const [city,setCity] = useState("bangkok");
  const [date,setDate] = useState("");
  

  const search = (e) =>{
    if(e.key === "Enter")
    {
      getData();
      
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
        <label>City:</label>
        <input type="text" onChange={(event) => {setCity(event.target.value)}} onKeyPress={search} />
        </div>
      
      {(typeof data.name != "undefined" ? (
        <>
          <div className="weather-item"><h2 className='date'>{date}</h2></div>
          <div className="weather-item"><h1>{data.name},{data.sys.country}</h1></div>
          <div className="weather-item"><h2>{data.main.temp} °C</h2></div>
        </>
      ) : "")}
      </div>
    </div>
  );
}

export default App;
