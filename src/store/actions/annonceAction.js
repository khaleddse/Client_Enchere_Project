import * as actionTypes from "./actionTypes";
import axios from "../../axios-ordres";

export const setAnnonce = (annonce,count) => {
  return {
    type: actionTypes.ANNONCEMENT,
    Annoncment_data: annonce,
    count,

  };
};
export const fetchAnnonceFailed=()=>{
  return{
    type:actionTypes.FETCH_ANNONCE_FAILED,
  };
}
export const setUserAnnonce=(userAnnounces)=>{
  return {
    type:actionTypes.USER_ANNONCES,
    userAnnounces,
  }
}

/*export const onAddNormalAnnonce=(subcateg_id,subject,details,city,likes,phone,image,price) => {
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
}*/
export const ongetAllAnnonce=(page)=>{

  return (dispatch)=>{
    axios
    .get(`/announce/?page=${page}`)
    .then(({data}) => {
      const {announces,announcesCount}=data
      return  dispatch(setAnnonce(announces,announcesCount))
    })
    .catch((err) => {
      dispatch(fetchAnnonceFailed());
    });
   
  }
}

export const getUserAnnounces = (userid) => {

  return (dispatch)=>{
     axios
    .get(`/announce/user/${userid}`)
    .then(({data}) => {
      
      return  dispatch(setUserAnnonce(data))
    })
    .catch((err) => {
      console.error(err);
    });
  }
};