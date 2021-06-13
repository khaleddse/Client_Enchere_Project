import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";
import { Spinner, Stack } from "@chakra-ui/react";
import { Button,Center } from "@chakra-ui/react";
import { useHistory } from "react-router";
import openSocket from "socket.io-client";
import Navbar from "../../components/AppBar/AppBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(4),
      marginLeft: "30%",
      marginRight: "40%",
    },
  },
}));

const AnnoncmentPage = ({
  ongetAnnoncmentHandler,
  annonce,
  counts,
  ongetUserAnnoncmentHandler,
  usr,
  isloding,
  ongetAllCategories,
  onFiltredAnnoncment,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [isfiltred, setIsFiltred] = useState(false);
  const [text, setText] = useState({ search: "" });
  let history = useHistory();

  useEffect(() => {
    ongetAnnoncmentHandler(page);

    ongetUserAnnoncmentHandler(usr.userId);

    ongetAllCategories();

    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "create") {
        console.log("socket test");
        ongetAnnoncmentHandler();
      } else if (data.action === "update") {
        ongetAnnoncmentHandler();
      } else if (data.action === "delete") {
        ongetAnnoncmentHandler();
      }else if (data.action==='isUpdated'){
        ongetAnnoncmentHandler();
      }
      
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const pagesNumber = counts;
  const selectedCateg = async (id, type) => {

    if (type === "subcateg") {
      onFiltredAnnoncment(id)
     
    } else if (type === "all") {
     // setAnnouncements(announcementscontexte);
    }

  };
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) 
    setIsFiltred(true);
    else 
    setIsFiltred(false);

    setText({ search: value });
  };
  const regex = new RegExp(text.search, "i");
  return (
    <div className={classes.root}>
      <Navbar
       selectedCateg={selectedCateg}
       filterHandler={FilterChangeHandler}
      />
      {isloding ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            m="auto"
          />
        </Stack>
      ) : (
        <SimpleGrid minChildWidth="300px" spacing="10px" px={{base:"1rem",md:"12rem"}} pt="3rem">
          {
          isfiltred ? (
            annonce
              .filter((annonces) => {
                if (regex.test(annonces.subject)) {
                  return annonces;
                } else {
                  return null;
                }
              })
              .map((item) => <Card item={item} key={item._id} />))
              :
          
          annonce &&
            annonce.map((item) => <Card item={item} key={item._id} />)}
        </SimpleGrid>
      )}
      <Center>
      <Pagination
        count={pagesNumber}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
      </Center>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    annonce: state.annoncement.annonces,
    counts: state.annoncement.count,
    usr: state.users.user,
    isloding: state.annoncement.isLoding,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFiltredAnnoncment:(id)=>dispatch({type:"FILTRED",id}),
    ongetAnnoncmentHandler: (page) =>
      dispatch(annonceAction.ongetAllAnnonce(page)),
    ongetUserAnnoncmentHandler: (userid) =>
      dispatch(annonceAction.getUserAnnounces(userid)),
    ongetAllCategories: () => dispatch(annonceAction.getAllCategorie()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnnoncmentPage);
