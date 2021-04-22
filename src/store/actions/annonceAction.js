import * as actionTypes from "./actionTypes";
import axios from "../../axios-ordres";



export const onAddNormalAnnonce=(subcateg_id,subject,details,city,likes,phone,image,price) => {
    const authData={
        subject,details,city,likes,phone,image,price,
    };
    return (dispatch) => {
        axios
          .post(`normalAnnounce/add/${subcateg_id}`, authData)
          .then((resData) => {
            dispatch(setUser(resData.data));
          })
          .catch((error) => {
            dispatch(fetchSignupFailed());
          });
      };
}