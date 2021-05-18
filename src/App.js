import Route from "./Routes";
import Footer from "./components/Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/AppBar/AppBar";
import { connect } from "react-redux";
function App({auth,isauthempl}) {
 
  return (
    <ChakraProvider>
    <Navbar/>
    <Route isAuth={auth} isAuthempl={isauthempl}/>
    <Footer/>
    </ChakraProvider>
  );
}
const mapStateToProps=(state)=>{
  return {
    auth:state.users.isauth,
    isauthempl:state.users.isauthempl
  }
}
export default connect(mapStateToProps)(App);
