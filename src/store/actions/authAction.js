import * as actionTypes from "./actionTypes";
import axios from "../../axios-ordres";


export const setData = (login_data) => {
  return {
    type: actionTypes.SET_DATA,
    login_data: login_data,
  };
};

export const setUser = (signup_data) => {
  return {
    type: actionTypes.SIGNUP,
    login_data: signup_data,
  };
};

export const fetchAuthFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED,
  };
};

export const fetchSignupFailed = () => {
  return {
    type: actionTypes.SIGNUP_FAILED,
  };
};


export const setIsLodaingUser = () => {
  return {
    type: actionTypes.ISLOADING_CONNECTION,
  };
};



export const onSingin = (email, password, history) => {
  const authData = {
    email: email,
    password: password,
  };
  return (dispatch) => {
    dispatch(setIsLodaingUser())
    axios
      .post("/auth/login", authData)
      .then((resData) => {
        dispatch(setData(resData.data));
        history.push("/Accuiel");
      })
      .catch((error) => {
        dispatch(fetchAuthFailed());
      });
  };
};

export const onSignup = (
  firstname,
  lastname,
  phone,
  image,
  email,
  password,
  point,
  announces
) => {
  const authData = {
    firstname,
    lastname,
    phone,
    image,
    email,
    password,
    point,
    announces,
  };
  return (dispatch) => {
    dispatch(setIsLodaingUser())
    axios
      .post("/user/add", authData)
      .then((resData) => {
        dispatch(setUser(resData.data));
      })
      .catch((error) => {
        dispatch(fetchSignupFailed());
      });
  };
};
