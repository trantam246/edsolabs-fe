import { UserContextProvider } from "../contexts/UserContext";
import { TaskContextProvider } from "../contexts/TaskContext";
import { TagContextProvider } from "../contexts/TagContext";
import Login from "./login/Login";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import Notify from "../components/Notify";

function App() {
  return (
    <>
      <UserContextProvider>
        <TagContextProvider>
          <TaskContextProvider>
            <Notify />
            <Router>
              <Switch>
                <Route path="/login" component={Login}></Route>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return localStorage.getItem("user") ? (
                      <Dashboard />
                    ) : (
                      <Redirect to="/login" component={Login} />
                    );
                  }}
                ></Route>
              </Switch>
            </Router>
          </TaskContextProvider>
        </TagContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;