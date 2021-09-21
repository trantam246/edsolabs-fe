import React, { useContext } from "react";
import { Box } from "@mui/system";
import Nav from "./nav";
import Time from "../Timer/time";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {DataContext} from '../context/dataContent'

function Home(props) {
  const dataTasks = useContext(DataContext);
  return (
    <Router>
      <Box width="100%" height="100vh" display="flex">
        <Nav dataUser={props.data} />
        <Box width="80%">
          <Switch>
            <Route exact path="/timer" component={Time} />
            <Route path="/report" component={Time} />
          </Switch>
        </Box>
      </Box>
    </Router>
  );
}

export default Home;
