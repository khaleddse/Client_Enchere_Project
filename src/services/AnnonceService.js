import axios from 'axios';
import {setToken} from "../axios-ordres";


export const onAddNormalAnnonce = (userid,subcateg_id,cityId, authData) => {

  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  return axios
    .post(`http://localhost:5000/normalAnnounce/add/${userid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
     
      console.error(err.message);
    });
};

export const onAddDrawAnnonce = (subcateg_id,cityId, authData) => {
  const token = localStorage.getItem("token");
  setToken(token);
  return axios
    .post(`draw/add/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const onAddEnchereAnnonce = (subcateg_id,cityId, authData) => {
  const token = localStorage.getItem("token");
  setToken(token);
  return axios
    .post(`enchere/add/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};