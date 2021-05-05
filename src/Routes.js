import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import StripeContainer from "./pages/Stripe/StripeContainer";
import { Route, Switch, Redirect } from "react-router-dom";
import Account from "./pages/Account/Account";
import AddAnnoucement from "./pages/Annoncement/AddAnnoncment";
import AnnoncmentPage from "./pages/Annoncement/AnnoncementPage";
import ContactUs from "./pages/avis/ContactUs";
import ListAvis from "./pages/avis/ListAvis";

const Routes = ({ isAuth }) => {
  let routes;
  console.log(isAuth);
  routes = (
    <Switch>
      <Route
        path="/accueil"
        exact
        render={(props) => <AnnoncmentPage {...props} />}
      />
      <Route path="/contactus" exact render={(props) => <ContactUs {...props} />} />
      <Route
        path="/avis"
        exact
        render={(props) => <ListAvis {...props} />}
      />
      <Route
        path="/addannonce"
        exact
        render={(props) => <AddAnnoucement {...props} />}
      />
      <Route path="/signin" exact render={(props) => <Login {...props} />} />
      <Route path="/signup" exact render={(props) => <Signup {...props} />} />
      <Route
        path="/pay"
        exact
        render={(props) => <StripeContainer {...props} />}
      />
      <Route path="/account" exact render={(props) => <Account {...props} />} />
      <Redirect to="/Accuiel" />
    </Switch>
  );

  return routes;
};

export default Routes;
