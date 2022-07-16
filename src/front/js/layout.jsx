import React, { useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Context } from "./store/appContext";
import { Feed } from "./pages/feed";
import { Trip } from "./pages/trip";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Message } from "./pages/message";
import { MyTrips } from "./pages/myTrips";
import { NoEditProfile } from "./pages/noEditProfile";
import { Favorites } from "./pages/favorites";
import { Help } from "./pages/help";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ScrollToTop } from './component/scrollToTop';

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  const { store } = useContext(Context);
  return (
    <div>
      <BrowserRouter basename={basename}>
        {store.logged == true ? <Navbar /> : null}
        <div>
          <ScrollToTop />
          <Switch>
            <Route exact path="/">
              {store.logged != true ? (
                <Login />
              ) : (
                <Redirect to="/feed"></Redirect>
              )}
            </Route>
            <Route exact path="/feed">
              {store.logged == true ? <Feed /> : <Redirect to="/"></Redirect>}
            </Route>
            <Route exact path="/home">
              {store.logged == true ? <Feed /> : <Redirect to="/"></Redirect>}
            </Route>
            <Route exact path="/profile/:id">
              {store.logged == true ? (
                <Profile />
              ) : (
                <Redirect to="/"></Redirect>
              )}
            </Route>
            <Route exact path="/noEditProfile/:id">
              {store.logged == true ? (
                <NoEditProfile />
              ) : (
                <Redirect to="/"></Redirect>
              )}
            </Route>
            <Route exact path="/trip/:id">
              {store.logged == true ? <Trip /> : <Redirect to="/"></Redirect>}
            </Route>
            <Route exact path="/message">
              {store.logged == true ? (
                <Message />
              ) : (
                <Redirect to="/"></Redirect>
              )}
            </Route>
            <Route exact path="/mytrips">
              {store.logged == true ? (
                <MyTrips />
              ) : (
                <Redirect to="/"></Redirect>
              )}
            </Route>
            <Route exact path="/favorites">
              {store.logged == true ? (
                <Favorites />
              ) : (
                <Redirect to="/"></Redirect>
              )}
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
