import "./App.css"
import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./components/Login/Login"
import Sidebar from "./components/Sidebar/Sidebar"
import TimerPage from "./components/Timer/TimerPage";
import ReportPage from "./components/Report/ReportPage";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn')
    if (storedLogin === '1') setIsLoggedIn(true)
  }, [])

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true)
  }
  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
  }

 
  return (
    <Router>
      {isLoggedIn && <Sidebar onLogout={logoutHandler} />}
      <Switch>
        <Route exact path="/">{isLoggedIn ? <TimerPage /> : <Login onLogin={loginHandler} />}</Route>
        <Route path="/report"> {isLoggedIn ? <ReportPage  /> : <Login onLogin={loginHandler} />}</Route>
        <Route path="/login" >{!isLoggedIn && <Login onLogin={loginHandler} />}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
