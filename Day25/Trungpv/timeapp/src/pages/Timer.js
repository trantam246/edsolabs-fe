import React from "react";
import Admin from "../components/login/Admin";
import { useHistory } from "react-router-dom";
import Startask from "../layout/Startask";

function Timer() {
  const history = useHistory();
  if (localStorage.getItem("user") === null) {
    alert("vui long dang nhap");
    history.push("/");
  }
  return (
    <>
      <div>
        <div className="d-flex">
          <Admin />
          <div className="col-9">
            <Startask />
          </div>
        </div>
      </div>
    </>
  );
}

export default Timer;