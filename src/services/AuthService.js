
import axios from '../axios-ordres';
export const signupHandler = (authData) => {
    return axios
      .post("/user/add", authData)
      .then((resData) => {
          console.log(resData)
        return resData.data;
      })
      .catch((err) => {
          console.log(err.message)
        console.error(err.message);
      });
  };
  