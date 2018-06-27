import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import locationFinder from './locationFinder'

export default combineReducers({
  routing: routerReducer,
  locationFinder
})