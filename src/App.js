import Route from "./Routes";
import Footer from "./components/Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/AppBar/AppBar";
import { connect } from "react-redux";
function App({auth}) {
 
  return (
    <ChakraProvider>
      <Navbar/>
    <Route isAuth={auth}/>
    <Footer/>
    </ChakraProvider>
  );
}
const mapStateToProps=(state)=>{
  return {
    auth:state.users.isauth,
    
  }
}
export default connect(mapStateToProps)(App);
