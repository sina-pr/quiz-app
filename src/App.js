import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import { connect } from "react-redux";

function App({ user }) {
  console.log(user);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};
export default connect(mapStateToProps)(App);
