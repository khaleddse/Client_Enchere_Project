import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";
import * as authAction from "../../store/actions/index";
import { connect } from "react-redux";
import { signUpSchema } from "../util/schema";
import validate from "validate.js";
import { signupHandler } from "../../services/AuthService";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [SignupFailedState, setSignupFailed] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      firstname: "",
      lastname: "",
      phone: "",
      image: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    isValid: false,
    error: {},
    touched: {},
    isAuth: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, signUpSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      error: errors || {},
    }));
  }, [formState.values]);

  const inputChangeHandler = (e) => {
    e.target.name === "email" && setSignupFailed(false);
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
  let history = useHistory();
  const onSignupHandler = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      phone,
      image,
      email,
      password,
    } = formState.values;
    const signupData = {
      firstname,
      lastname,
      phone,
      image,
      email,
      password,
    };
    setisLoading(true);

    const response = await signupHandler(signupData);

    if (response) {
      history.push("/signin");
    } else {
      setSignupFailed(true);
      setOpen(false);
    }
    setisLoading(false);
  };
  const isValidPassword = () => {
    return formState.touched["confirmpassword"]
      ? formState.values.password === formState.values.confirmpassword
        ? true
        : false
      : true;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.error[field] ? true : false;

  /*useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);*/

  let fieldsArray = [];
  for (let key in formState.values) {
    fieldsArray.push({
      id: key,
      value: formState.values[key],
      name: key,
    });
  }
  //console.log(fieldsArray);
  //console.log(formState);
  return (
    <Auth>
      <form onSubmit={(e) => onSignupHandler(e)}>
        {fieldsArray.map(({ name, value }) => (
          <div>
            <TextField
              name={name}
              id={name}
              key={name}
              label={name}
              type={
                name === "image"
                  ? "name"
                  : name === "confirmpassword"
                  ? "password"
                  : name
              }
              value={value}
              onChange={inputChangeHandler}
              error={hasError(name)}
              helperText={hasError(name) ? formState.error[name] : null}
            />
            <br />
          </div>
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={onSignupHandler}
          disabled={!formState.isValid || !isValidPassword()}
          style={{
            marginTop: "30px",
          }}
        >
          S'inscrire
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
    onLoginHandler: (nom, prenom, email, password) =>
      dispatch(authAction.onSingin(nom, prenom, email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
