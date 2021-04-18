
import axios from 'axios';
export const signupHandler = (authData) => {
    return axios
      .post("http://localhost:5000/user/add", authData)
      .then((resData) => {
          console.log(resData)
        return resData.data;
      })
      .catch((err) => {
          console.log(err)
        console.error(err);
      });
  };