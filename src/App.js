import React from "react";
import './index.css'

const api ={
  key: "0155ce25f5734419bffce08eb11f2eb9",
  base: "https://api.openweathermap.org/data/2.5/"  
}

export default function App(){
  
  const [inputValue,setInputValue] = React.useState('')
  const [weather,setWeather] = React.useState({})

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${inputValue}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result =>{
        setWeather(result)
        setInputValue('')
        console.log(weather)
      })
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return(
  <div className={(typeof weather.main!='undefined')?
  ((weather.main.temp>16)?'app-warm':'app'):'app'
  } >
    <main>
      <div className="search-bar">
        <input
          value={inputValue}
          onChange={(e) =>setInputValue(e.target.value)} 
          placeholder="Search"
          onKeyPress={search}>          
        </input>
      </div>
      {(typeof weather.main!= "undefined")?
      (<div className="new-app">
        <div className="location">
        {weather.name}, {weather.sys.country}
        </div>
        <div className="date">
        {dateBuilder(new Date())}
        </div>
        <div className="temperature">
          {Math.round(weather.main.temp)}°C
        </div>
        <div className="weather">
        {weather.weather[0].main}
        </div>
        </div>):('')}      
    </main>
  </div>

  )
}