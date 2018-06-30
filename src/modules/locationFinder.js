import 'whatwg-fetch'
import { LOCATION_ENDPOINT, API_KEY } from './http-data'

import { fetchWeatherByKey } from './currentWeather'

export const SET_POSITION = '[GEOLOCATION] SET POSITION';
export const SET_CITY = '[CITY FINDER] SET CITY';
export const FETCH_CITIES = '[CITY FINDER] FETCH CITIES';
export const SET_CITY_BY_KEY = '[CITY FINDER] SET BY KEY';

const initialState = {
  currentPosition: {
    latitude: 0,
    longitude: 0
  },
  currentCity: {},
  citiesAvalible: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        currentPosition: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      }
    case SET_CITY:
      return {
        ...state,
        currentCity: action.payload
      }
    case FETCH_CITIES:
      return {
        ...state,
        citiesAvalible: action.payload
      }
    case SET_CITY_BY_KEY:
      const city = state.citiesAvalible.find((val) => val.Key === action.payload);
      return {
        ...state,
        currentCity: city !== -1 ? city : null
      }
    default:
      return state;
  }
}

export const setCurrentPositionByGeolocation = () => {
  if ("geolocation" in navigator) {
    return dispatch => {
      return navigator.geolocation.getCurrentPosition((position) => {
        dispatch({
          type: SET_POSITION,
          payload: position
        });
        fetch(LOCATION_ENDPOINT + `/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}&language=pl`)
          .then(response => response.json())
          .then((data) => {
            setSelectedCity(data);
            // dispatch({
            //   type: SET_CITY,
            //   payload: data
            // });
          })
          .catch((e) => {
            console.warn(e);
          });
      });
    }
  } else {
    console.warn('W tej przeglądarce nie ma dostępu do geolokalizacji :-/');
    return dispatch => dispatch({
      type: SET_POSITION,
      payload: {}
    });
  }
}

export const fetchCities = (query) => {
  return dispatch => {
    return fetch(LOCATION_ENDPOINT + `/autocomplete?apikey=${API_KEY}&q=${query}&language=pl`)
      .then(response => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_CITIES,
          payload: data
        });
      }).catch((e) => {
        console.warn(e);
      });
  }
}

export const setCityByMock = () => {
  return dispatch => dispatch({
    type: SET_CITY,
    payload: {
      LocalizedName: 'Kielce'
    }
  })
}

export const setAvalibleCitiesByMock = () => {
  return dispatch => dispatch({
    type: FETCH_CITIES,
    payload: [
      {LocalizedName: 'Kielce', Key: '1'},
      {LocalizedName: 'Warszawa', Key: '2'}
    ]
  })
}

// value is key or city object
export const setSelectedCity = (value) => {
  console.warn(value);
  return dispatch => {
    if (value.length) {
      dispatch({
        type: SET_CITY_BY_KEY,
        payload: value
      });
      fetchWeatherByKey(value);
    } else {
      dispatch({
        type: SET_CITY,
        payload: value
      });
      fetchWeatherByKey(value.Key);
    }
  }
}
