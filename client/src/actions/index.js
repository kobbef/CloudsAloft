import axios from "axios";
import { FETCH_USER, FETCH_SURVEYS, FETCH_AIRPORTS } from "./types";

/* Action Creators */
export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

/* Handle payment token from Stripe */
export const handleToken = (token) => async (dispatch) => {
  //This API will return the updated user model
  const res = await axios.post("/api/stripe", token);
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

/* Handle survey submittal */
export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/surveys", values);
  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

/* Fetch Surveys */
export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get("/api/surveys");
  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

/* Fetch TAF */
export const fetchAirports = () => async (dispatch) => {
  const res = await axios.get("/api/current_airports");
  dispatch({ type: FETCH_AIRPORTS, payload: res.data });
};
