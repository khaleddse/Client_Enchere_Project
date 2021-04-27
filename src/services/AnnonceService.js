
import axios from "../axios-ordres";


export const onAddNormalAnnonce = (userid,subcateg_id,cityId, authData) => {

  
  return axios
    .post(`/normalAnnounce/add/${userid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
     
      console.error(err.message);
    });
};

export const onAddDrawAnnonce = (subcateg_id,cityId,usrid,authData) => {
 
  return axios
    .post(`draw/add/${usrid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const onAddEnchereAnnonce = (userid,subcateg_id,cityId, authData) => {
 
  return axios
    .post(`enchere/add/${userid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserAnnounces = (id) => {

  return axios
    .get(`/announce/user/${id}`)
    .then((resData) => {
      console.log(resData);
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};