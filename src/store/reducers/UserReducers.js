import * as actionTypes from "../actions/actionTypes";
import decode from "jwt-decode";
import { updateObject } from "../utility";

const initialState = {
  isauth: false,
  isauthEmpl: false,
  token: "",
  error: false,
  user:[],
  listcategorie:[
    {
        subcategs: [
            {
               
                _id: "6080a51301e27019070ae2d8",
                nom: "bmw",
               
            }
        ],
        _id: "6080a4f401e27019070ae2d7",
        nom: "voiture",
        
    }
]
};

const login = (state, action) => {
  const updatestate = {
    token: action.login_data.token,
    isauth: true,
    isauthEmpl: false,
    error: false,
    user:[decode(action.login_data.token)]
  };
  localStorage.setItem("token", action.login_data.token);

  return updateObject(state, updatestate);
};
const Failed_Auth = (state, action) => {
  localStorage.removeItem("token");
  return updateObject(state, {
    token: "",
    isauth: false,
    isauthEmpl: false,
    error: true,
  
  });
};

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
