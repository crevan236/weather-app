import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import locationFinder from './locationFinder'
import currentWeather from './currentWeather'

export default combineReducers({
  routing: routerReducer,
  locationFinder,
  currentWeather
})