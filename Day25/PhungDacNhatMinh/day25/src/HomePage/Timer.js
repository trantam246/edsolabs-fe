import React from "react";
import Aside from "../Components/Aside";
import { useHistory } from "react-router-dom";
import AddTask from "../Components/AddTask";

function Timer() {
  const history = useHistory();
  if (localStorage.getItem("user") === null) {
    alert("Chưa đăng nhập, quay về trang Login.");
    history.push("/");
  }
  return (
    <>
      <div className="main ">
        <div className="d-flex">
          <Aside />
          <main className="job col-9">
            <AddTask />
          </main>
        </div>
      </div>
    </>
  );
}

export default Timer;
