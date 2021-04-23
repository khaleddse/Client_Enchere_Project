import * as actionTypes from "../actions/actionTypes";
import decode from "jwt-decode";
import { updateObject } from "../utility";

const initialState = {
  isauth: false,
  isauthEmpl: false,
  token: "",
  error: false,
  user:[],
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
]
};


const login = async(state, action) => {
  const updatestate = {
    token: action.login_data.token,
    isauth: true,
    isauthEmpl: false,
    error: false,
    
  };
  localStorage.setItem("token", action.login_data.token);

  return updateObject(state, updatestate);
};
const Failed_Auth = async (state, action) => {
  localStorage.removeItem("token");
  return updateObject(state, {
    token: "",
    isauth: false,
    isauthEmpl: false,
    error: true,
   

});
}

const onSignup=(state,action)=>{

}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return login(state = initialState, action);
    case actionTypes.AUTH_FAILED:
      return Failed_Auth(state, action);
    case actionTypes.SIGNUP: return onSignup(state = initialState, action);
    //case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default reducer;
