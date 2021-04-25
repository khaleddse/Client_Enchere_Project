import { useState, useEffect } from "react";
import validate from "validate.js";
import { regions } from "./data";
import TextField from "@material-ui/core/TextField";
import ImageUploader from "react-images-upload";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { AddAnnouncementSchema } from "../util/schema";
import { onAddNormalAnnonce } from "../../services/AnnonceService";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import decode from "jwt-decode";
import InputAdornment from "@material-ui/core/InputAdornment";
import { connect } from "react-redux";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "no-repeat",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  image: {
    marginTop: "10%",
    width: "80%",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  LogoGrid: {
    backgroundPosition: "center",
    textAlign: "center",
  },
  form: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    margin: " auto",
  },
  formGrid: {
    backgroundColor: "rgba(125, 138, 255, 0.1)",
  },
}));

const AddAnnoucement = (props) => {
  const classes = useStyles();

  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      objet: "",
      detail: "",
      city: {
        nom: "",
        id: "",
      },
      phone: "",
      price: "",
      subcategorie: {
        id: "",
        nom: "",
      },
      image: null,
    },
    isValid: false,
    errors: {},
    touched: {},
  });
useEffect(()=>{
console.log("dispatch second backend call")
},[])
  useEffect(() => {
    const errors = validate(formState.values, AddAnnouncementSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const onDrop = (picture) => {
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        image: picture,
      },
    }));
  };
  const token = localStorage.getItem("token");
  const user = decode(token);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    e.preventDefault();
    setisLoading(true);
    const form = new FormData();

    form.append("subject", formState.values.objet);
    form.append("details", formState.values.detail);
    form.append("city", formState.values.city);
    form.append("phone", formState.values.phone);
    form.append("price", formState.values.price);
    if (formState.values.image) {
      form.append("image", formState.values.image[0]);
    }
    form.append("likes", "1");
    const subcategId = formState.values.subcategorie.id;
    await onAddNormalAnnonce(
      user.userId,
      subcategId,
      formState.values.city.id,
      form
    );
    setisLoading(false);
   
    
     
    
   
  };

  const inputChangeHandler = (e) => {
    e.persist();

    if (e.target.name === "subcategorie") {
      const id = e.target.value.slice(
        e.target.value.indexOf("$") + 1,
        e.target.value.length
      );
      const name = e.target.value.slice(0, e.target.value.indexOf("$"));
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [e.target.name]: {
            id: id,
            nom: name,
          },
        },
        touched: {
          ...formState.touched,
          [e.target.name]: true,
        },
      }));
    } else if (e.target.name === "city") {
      const id = e.target.value.slice(
        e.target.value.indexOf("$") + 1,
        e.target.value.length
      );
      const name = e.target.value.slice(0, e.target.value.indexOf("$"));
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [e.target.name]: {
            id: id,
            nom: name,
          },
        },
        touched: {
          ...formState.touched,
          [e.target.name]: true,
        },
      }));
    } else {
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
    }
  };

  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };
  return (
    <form onSubmit={(e) => submitFormHandler(e)} className={classes.form}>
      <TextField
        id="object"
        key="object"
        name="objet"
        label="Titre"
        variant="outlined"
        error={hasError("objet")}
        helperText={hasError("objet") ? formState.errors.objet[0] : null}
        onChange={inputChangeHandler}
        value={formState.values.objet}
      />
      <br />
      <TextField
        value={formState.values.detail}
        onChange={inputChangeHandler}
        id="detail"
        key="detail"
        name="detail"
        label="Détails"
        multiline
        rows={4}
        variant="outlined"
      />
      <br />
      <TextField
        id="price"
        key="price"
        name="price"
        label="Prix en Dinar"
        variant="outlined"
        error={hasError("price")}
        helperText={hasError("price") ? formState.errors.price[0] : null}
        onChange={inputChangeHandler}
        value={formState.values.price}
        InputProps={{
          startAdornment: <InputAdornment position="start">DT</InputAdornment>,
        }}
      />
      <br />
      <TextField
        id="phone"
        key="phone"
        name="phone"
        label="phone_Number"
        variant="outlined"
        error={hasError("phone")}
        helperText={hasError("phone") ? formState.errors.phone[0] : null}
        onChange={inputChangeHandler}
        value={formState.values.phone}
      />
      <br />
      <FormControl
        variant="outlined"
        error={hasError("city")}
        key="regictrlform"
      >
        <InputLabel htmlFor="outlined-age-native-simple">Ville</InputLabel>
        <Select
          key="regionoptselect"
          native
          label="Ville"
          inputProps={{
            name: "city",
            id: "outlined-age-native-simple",
          }}
          onChange={inputChangeHandler}
        >
          <option aria-label="None" value="" key="regionopt" />
          {regions[0].map((region) => (
            <option key={region.nom} value={region.nom + "$" + region._id}>
              {region.nom}
            </option>
          ))}
        </Select>
        <FormHelperText>
          {hasError("city") ? formState.errors.city[0] : null}
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl
        variant="outlined"
        error={hasError("subcategorie")}
        key="formctr"
      >
        <InputLabel htmlFor="outlined-age-native-simple">Catégorie</InputLabel>
        <Select
          key="sel"
          native
          label="Catégorie"
          inputProps={{
            name: "subcategorie",
            id: "outlined-age-native-simple",
          }}
          onChange={inputChangeHandler}
        >
          <option value="" key="opt" />
          {props.Listcategories.map((categ) => {
            let Result = categ.subcategs.map((subcateg) => {
              return (
                <option key="opst" value={subcateg.nom + "$" + subcateg._id}>
                  {subcateg.nom}
                </option>
              );
            });
            return (
              <optgroup key="grpop" label={categ.nom}>
                {Result}
              </optgroup>
            );
          })}
        </Select>
        <FormHelperText key="errsubcateg">
          {hasError("subcategorie") ? formState.errors.subcategorie[0] : null}
        </FormHelperText>
      </FormControl>
      <br />
      {/* <FormControl variant="outlined" error={hasError("typeannonce")}>
          <InputLabel htmlFor="outlined-age-native-simple">Type-Annonce</InputLabel>
          <Select
            native
            label="annonce-type"
            inputProps={{
              name: "typeannonce",
              id: "outlined-age-native-simple",
            }}
            value={formState.values.typeannonce}
            onChange={inputChangeHandler}
          >
            <option aria-label="None" value="" />
            {annoncestypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          </FormControl>*/}
      <FormHelperText key="helpers">
        {hasError("city") ? formState.errors.city[0] : null}
      </FormHelperText>

      <ImageUploader
        singleImage={true}
        key="img"
        type={File}
        withPreview={true}
        withIcon={true}
        label="Taille maximale du fichier: 5 Mo, acceptée: jpg"
        buttonText="importer une image"
        onChange={onDrop}
        fileSizeError="la taille du fichier est trop grande"
        fileTypeError="extension de fichier n'est pas prise en charge"
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
      <Button
        key="btnnn"
        variant="contained"
        color="primary"
        type="submit"
        style={{
          marginTop: "30px",
        }}
        disabled={isLoading || !formState.isValid}
        onClick={(e) => submitFormHandler(e)}
      >
        Poster
      </Button>
      {isLoading && <LinearProgress key="isloading" color="primary" />}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    // auth:state.isauth,
    usr: state.users.user,
    err: state.users.error,
    Listcategories: state.users.listcategorie,
  };
};
export default connect(mapStateToProps)(AddAnnoucement);
