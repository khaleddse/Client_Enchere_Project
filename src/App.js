import Route from "./Routes";
import Footer from "./components/Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/AppBar/AppBar";
function App() {
  return (
    <ChakraProvider>
      <Navbar />
      <Route />
      <Footer />
    </ChakraProvider>
  );
}

export default App;
