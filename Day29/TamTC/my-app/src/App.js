import React, { useContext } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Context from "./context/Context"
import Login from "./components/login/Login"
import Home from "./components/home/Home"
import "./App.css"

function App() {
  const ctx = useContext(Context)
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {!ctx.isLoggedIn && <Login />}
        </Route>

        <Route exact path="/">
          {ctx.isLoggedIn ? <Home /> : <Login />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
