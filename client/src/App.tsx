import React from "react";
import "./App.css";
import FormContainer from "user/containers/FormContainer";
import SignIn from "admin/pages/SignIn";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={() => <FormContainer />} />
        <Route path="/admin/signin" render={() => <SignIn />} />
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
