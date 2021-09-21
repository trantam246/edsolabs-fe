import "./App.scss";
import "./style/aside.scss";
import "./style/report.scss";
import Login from "./pages/LoginForm/Login.jsx";
import Timer from "./pages/Timer/Timer.jsx";
import Report from "./pages/Report/Report.jsx";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/timer" component={Timer}></Route>
          <Route path="/report" component={Report}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
