import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";

import Register from "./Components/Register";
import Profile from "./Components/Profile";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <PrivateRoute
        path="/profile"
        component={Profile}
        roles={["Employee", "Manager", "Hod"]}
      />
      <UnPrivateRoute path="/register" component={Register} />
    </Router>
  );
}

export default App;
