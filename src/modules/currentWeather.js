import 'whatwg-fetch'
import { WEATHER_ENDPOINT, API_KEY } from './http-data'

export const FETCH_WEATHER = '[CURRENT WEATHER] FETCH';
export const FETCH_WEATHER_SUCCESS = '[CURRENT WEATHER] FETCH SUCCESS';
export const FETCH_WEATHER_FAILURE = '[CURRENT WEATHER] FAILURE';

const initialState = {
  weather: {},
  pending: false,
  errorMsg: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEATHER_FAILURE:
      return {
        ...state,
        pending: false,
        errorMsg: 'Nie udało się pobrać pogody :-('
      }
    case FETCH_WEATHER_SUCCESS:
      return {
        ...state,
        pending: false,
        errorMsg: null,
        weather: action.payload
      }
    case FETCH_WEATHER:
      return {
        ...state,
        pending: true
      }
    default:
      return state;
  }
}

export const fetchWeatherByKey = (key) => {
  return dispatch => {
    return fetch(WEATHER_ENDPOINT + `/${key}?apikey=${API_KEY}&language=pl&details=true`)
    .then(response => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_WEATHER_SUCCESS,
          payload: data
        });
      }).catch((e) => {
        console.warn(e);
        dispatch({
          type: FETCH_WEATHER_FAILURE
        });
      });
  }
}