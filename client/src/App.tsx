import React from "react";
import "./App.css";
import FormContainer from "user/containers/FormContainer";
import SignIn from "admin/pages/SignIn";
import Dashboard from "admin/pages/Dashboard";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("cdap");
      const response = await fetch("/api/secure/validate", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      if (response.status === 200) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        localStorage.removeItem("cdap");
      }
    };
    validate();
  }, []);

  const login = async () => {
    setLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/home"
          render={() => <FormContainer loggedIn={loggedIn} />}
        />
        <Route path="/admin/signin" render={() => <SignIn logIn={login} />} />
        {loggedIn && (
          <Route path="/admin/dashboard" render={() => <Dashboard />} />
        )}
        <Redirect to="/home" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
