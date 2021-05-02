import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/card"
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";
//import { Spinner } from "@chakra-ui/react"
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(4),
      marginLeft:"30%",
      marginRight:"40%",
      
    },
  },
}));

const AnnoncmentPage = ({ongetAnnoncmentHandler,annonce,counts,ongetUserAnnoncmentHandler,usr,isLoadinge}) => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    
  useEffect(() => {
   
    ongetAnnoncmentHandler(page)
    
    ongetUserAnnoncmentHandler(usr.userId)
  },[page])// eslint-disable-line react-hooks/exhaustive-deps
 
const pagesNumber=Math.ceil(counts/9) 
  return (
    
    <div className={classes.root}>
   {/*isLoadinge? <Spinner
  thickness="4px"
  speed="0.65s"
  emptyColor="gray.200"
  color="blue.500"
  size="xl"
   />:    */}
<SimpleGrid minChildWidth="300px" spacing="10px">
      {annonce && annonce.map((item) => (
        <Card item={item} key={item._id}/>
      ))}
    </SimpleGrid>

    <Pagination count={pagesNumber} page={page} onChange={(_,value)=>setPage(value)} />
  </div>
  );
};
const mapStateToProps = (state) => {
    return {
     annonce:state.annoncement.annonces,
     counts:state.annoncement.count,
     usr:state.users.user
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        ongetAnnoncmentHandler: (page) =>dispatch(annonceAction.ongetAllAnnonce(page)),
        ongetUserAnnoncmentHandler:(userid)=>dispatch(annonceAction.getUserAnnounces(userid))
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(AnnoncmentPage);
