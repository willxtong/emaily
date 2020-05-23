import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async (dispatch) => {
  const { data } = await axios.get('/api/surveys');
  dispatch({ type: FETCH_SURVEYS, data });
};

export const fetchSurveys = () => async (dispatch) => {
  const { data } = await axios.get('/api/currentUser');
  dispatch({ type: FETCH_USER, data });
};

export const handleToken = (token) => async (dispatch) => {
  const { data } = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const { data } = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, data });
};
