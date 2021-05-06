import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";
import { Spinner, Stack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useHistory } from "react-router";
import openSocket from "socket.io-client";

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
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);

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
      }
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const pagesNumber = counts;

  return (
    <div className={classes.root}>
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
        <SimpleGrid minChildWidth="300px" spacing="10px">
          {annonce &&
            annonce.map((item) => <Card item={item} key={item._id} />)}
        </SimpleGrid>
      )}
      <Pagination
        count={pagesNumber}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
      <Button onClick={() => history.push("/addannonce")}></Button>
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
    ongetAnnoncmentHandler: (page) =>
      dispatch(annonceAction.ongetAllAnnonce(page)),
    ongetUserAnnoncmentHandler: (userid) =>
      dispatch(annonceAction.getUserAnnounces(userid)),
    ongetAllCategories: () => dispatch(annonceAction.getAllCategorie()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnnoncmentPage);
