import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,

} from "react-router-dom";
import { LoginPage } from "./components/page/login/loginPage";
import { HomePage } from "./components/page/protectedPage/homePage";
import { ErrPage } from "./components/errorPage/404Page";
function App() {
  const [avt, setAvt] = useState();
  const [name, setName] = useState();
  const callData = (a) => {
    setAvt(a)
  }
  const callName = (n) => {
    setName(n)
  } 
  return (
    <Router>
      <Switch>
        <Route path="/home">
          {
            localStorage.getItem("acess") ?  
            <HomePage 
              getUser={avt}
              getName={name}
            /> 
            : <Redirect to="/"/>
          }
        </Route>
        <Route path="/">
          <LoginPage getAvt={callData}
            getName={callName}
          />
        </Route>
        <Route component={ErrPage}>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
