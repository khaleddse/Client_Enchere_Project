import { setToken } from "../axios-ordres";
import axios from 'axios'
export const updateUser = (updateData) => {
    const token = localStorage.getItem("token");
    setToken(token);
    return axios
      .put("http://localhost:5000/user/update", updateData)
      .then((resData) => {
        localStorage.removeItem("token");
        localStorage.setItem("token", resData.data.token);
  
        return resData.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };