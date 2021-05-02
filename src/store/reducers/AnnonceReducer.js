import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    annonces: [],
    count:null,
    error:false,
    userAnnounces:[],
    isLoding:true,
  
  };

  const UserAnnouncment=(state,action)=>{
    return updateObject(state,{
      userAnnounces:action.userAnnounces.reverse()
    })
  }

  const Annoncment=(state, action) => {
return updateObject(state,{
  annonces:action.Annoncment_data,
  count:action.count,
  isLoding:false
})
  }
 const fetchAnnounceFailed=(state,action)=>{
   return updateObject(state,{
     error:true
   })
 }

const AnnonceReducer = (state = initialState, action) => {
    
  switch (action.type) {
      case actionTypes.ANNONCEMENT: return Annoncment(state, action);
      case actionTypes.FETCH_ANNONCE_FAILED: return fetchAnnounceFailed(state, action);
      case actionTypes.USER_ANNONCES:return UserAnnouncment(state,action);
      default: return state;
    
  };
}

export default AnnonceReducer;