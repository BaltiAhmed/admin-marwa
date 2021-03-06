import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBFooter,
  MDBNavLink,
  MDBTooltip,
  MDBIcon,
} from "mdbreact";
import { ReactComponent as Logo } from "./assets/logo.svg";
import Routes from "./Routes";
import { Route, BrowserRouter } from "react-router-dom";
import { UserAuth } from "./hooks/auth";
import { Authcontext } from "./context/auth-context";
import Login from "./views/login";
import NavBar from "./components/nav-bar";
import ChartsPage from "./views/chart";
import ListSite from "./views/site/list";
import Ajout from "./views/site/ajout";
import ListClient from "./views/client/list";
import ListCategorie from "./views/categorie/list";
import image from "./images/image.jpg";
import { height } from "@mui/system";
import UpdateSite from "./views/site/update";

function App() {
  const { userId, token, login, logout, user } = UserAuth();

  let routes;
  if (token) {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={ChartsPage} />
        <Route path="/site" component={ListSite} />
        <Route path="/ajout-site" component={Ajout} />
        <Route path="/client" component={ListClient} />
        <Route path="/categorie" component={ListCategorie} />
        <Route path="/update-site/:id" component={UpdateSite} />
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Route exact path="/" component={Login} />
      </React.Fragment>
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        /* backgroundRepeat: "no-repeat", */
        position: "absolute",
        //height: "100vh",
        width: "100%",
        backgroundPosition: "center",
        backgroundRepeat:"repeat-y",
        top:"0px",
        bottom:"0px",
        height:"fit-content"
      }}
    >
      <Authcontext.Provider
        value={{
          userId: userId,
          token: token,
          login: login,
          logout: logout,
          user: user,
        }}
      >
        
        <BrowserRouter>
          {!token ? <Login /> : <div><NavBar  /> {routes} </div>}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
