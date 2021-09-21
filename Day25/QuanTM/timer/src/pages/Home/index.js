import React from "react";
import { Switch, Route } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Report from "../Report";
import Timer from "../Timer";
import MainPagesContainer from "../../containers/MainPagesContainer";

export default function Home() {
  return (
    <>
      <Sidebar />
      <MainPagesContainer>
        <Switch>
          <Route path="/" component={Timer} exact />
          <Route path="/report" component={Report} exact />
        </Switch>
      </MainPagesContainer>
    </>
  );
}
