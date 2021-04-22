import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Sinup";
import  StripeContainer from "./pages/Stripe/StripeContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import Account from "./pages/Account/Account"
import AddAnnoucement from "./pages/Annoncement/AddAnnoncement";

const Routes = () => {
  
  let routes;
  
    routes = (
      <Switch>*
         <Route
          path="/addannonce"
          exact
          render={(props) => <AddAnnoucement {...props} />}
        />
        <Route
          path="/signin"
          exact
          render={(props) => <Login {...props} />}
        />
        <Route
          path="/signup"
          exact
          render={(props) => <Signup {...props} />}
        />
        <Route
        path="/pay"
        exact
        render={(props)=><StripeContainer {...props}/>} />
                <Route
        path="/account"
        exact
        render={(props)=><Account {...props}/>} />
        
      </Switch>
    );
  
  return routes;
};

export default Routes;
