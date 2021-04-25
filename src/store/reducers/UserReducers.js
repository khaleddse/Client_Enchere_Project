
import * as actionTypes from "../actions/actionTypes";
import decode from "jwt-decode";
import { updateObject } from "../utility";


const initialState = {
  isauth: false,
  isauthEmpl: false,
  token: "",
  error: false,
  user:{},
  citys:[],
  listcategorie:[
    {
        "subcategs": [
            {
                "announces": [],
                "_id": "6082c08d5c4e9f2458b035d1",
                "nom": "bmw",
                
            }
        ],
        "_id": "6082c0705c4e9f2458b035d0",
        "nom": "voiture",
        
    }
],
};


const login = (state, action) => {
  const token=action.login_data.token
  localStorage.setItem("token", token);
  return updateObject(state, {
    token: token,
    user:decode(token),
    isauth:true,
  
  });
};
const Failed_Auth =(state, action) => {
  localStorage.removeItem("token");
  return updateObject(state, {
    token: "",
    isauth: false,
    isauthEmpl: false,
    error: true,
   

});
}

//const onSignup=(state,action)=>{

//}

const reducer = ( state =initialState ,  action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:return login(state , action);
    case actionTypes.AUTH_FAILED:return Failed_Auth(state, action);
    //case actionTypes.SIGNUP: return onSignup(state , action);
    //case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
  
};

export default reducer;
