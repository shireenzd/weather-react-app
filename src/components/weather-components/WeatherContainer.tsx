import React from 'react'
import LocationInfo from "./LocationInfo"
import WeatherInfo from "./WeatherInfo"

function WeatherContainer({data}:{data:any}) {
    const weatherContainerStyles ={
        display: 'flex',
        flexDirection: 'row' as 'row',
        gap:'50px',
        justifyContent:'center'
    }
  return (
    <div style={weatherContainerStyles}>
        <LocationInfo data={data} />
        <WeatherInfo data={data} />
    </div>
  )
}

export default WeatherContainer