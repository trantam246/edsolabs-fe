import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";
import { LoginPage } from "./components/page/login/loginPage";
import { HomePage } from "./components/page/protectedPage/homePage";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          {
            localStorage.getItem("acess") ?  
            <HomePage /> 
            : <Redirect to="/"/>
          }
        </Route>
        <Route path="/">
          <LoginPage/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
