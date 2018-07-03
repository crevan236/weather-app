import 'whatwg-fetch'
import { LOCATION_ENDPOINT, API_KEY, WEATHER_ENDPOINT } from './http-data'

import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER, FETCH_WEATHER_FAILURE } from './currentWeather'

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
            dispatch({
              type: SET_CITY,
              payload: data
            });
            dispatch({
              type: FETCH_WEATHER
            });
            fetch(WEATHER_ENDPOINT + `/${data.Key}?apikey=${API_KEY}&language=pl&details=true`)
              .then(response => response.json())
                .then((val) => {
                  dispatch({
                    type: FETCH_WEATHER_SUCCESS,
                    payload: val[0]
                  });
                }).catch((e) => {
                  dispatch({
                    type: FETCH_WEATHER_FAILURE
                  });
                });
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
  return dispatch => {
    dispatch({
      type: SET_CITY_BY_KEY,
      payload: value
    });
    dispatch({
      type: FETCH_WEATHER
    });
    fetch(WEATHER_ENDPOINT + `/${value}?apikey=${API_KEY}&language=pl&details=true`)
      .then(response => response.json())
        .then((data) => {
          dispatch({
            type: FETCH_WEATHER_SUCCESS,
            payload: data[0]
          });
        }).catch((e) => {
          // console.warn(e);
          dispatch({
            type: FETCH_WEATHER_FAILURE
          });
        });
  }
}
