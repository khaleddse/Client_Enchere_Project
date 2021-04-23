import axios from '../axios-ordres';

export const AllCitys = (authData) => {
    return axios
      .get("/city/", authData)
      .then((resData) => {
        return resData.data;
      })
      .catch((err) => {
       console.error(err.message);
      });
};
  