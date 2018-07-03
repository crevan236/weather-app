import React from 'react'

import CityFinder from '../city-finder';
import CurrentWeather from '../current-weather';
import WeatherDetails from '../weather-details';
import WeatherCharts from '../weather-charts';

const Home = props => (
  <div>
    <CityFinder></CityFinder>
    <CurrentWeather></CurrentWeather>
    <WeatherDetails></WeatherDetails>
    <WeatherCharts></WeatherCharts>
  </div>
)
export default Home