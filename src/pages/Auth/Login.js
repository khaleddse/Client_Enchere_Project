import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";
import * as authAction from "../../store/actions/index";
import { connect } from "react-redux";
import {signInSchema} from "../util/schema";
import validate from "validate.js";

const Login = (props) => {
    const [isLoading ,setIsLoading]=useState(false)
  const [formState, setFormState] = useState({
    values: {
      email: "",
      password: "",
    },
    isValid: false,
    errors: {},
    touched: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, signInSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

 
  const inputChangeHandler = (e) => {
    //setSignupFailed(false);
    e.persist();
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };
  
  const hasError = (field) =>formState.touched[field] && formState.errors[field] ? true : false;
    

    const submitFormHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
       
        
          props.onLoginHandler(
            formState.values.email,
            formState.values.password,
          );
          
        setIsLoading(false);
    };
    
  
  
  return (
    
    <Auth>
    
      <form onSubmit={(e) => submitFormHandler(e)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          type="email"
          fullWidth
          autoComplete="email"
          autoFocus
          id="email"
          name="email"
          label="E-mail"
          error={hasError("email")}
          helperText={hasError("email") ? formState.errors.email[0] : null}
          onChange={inputChangeHandler}
          value={formState.values.email}
        />
        <TextField
          ariant="outlined"
          margin="normal"
          required
          fullWidth
          type="password"
          autoComplete="current-password"
          id="password"
          name="password"
          label="Mot de passe"
          onChange={inputChangeHandler}
        />
        {props.err && <p>E-mail où mot de passe incorrect !</p>}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isLoading || !formState.isValid}
         
        >
          Se connecter
        </Button>
    
      </form>
    </Auth>
  );
};
const mapStateToProps = (state) => {
  return {
    // auth:state.isauth,
    err: state.users.error,
   
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginHandler: (email, password) =>
      dispatch(authAction.onSingin(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
