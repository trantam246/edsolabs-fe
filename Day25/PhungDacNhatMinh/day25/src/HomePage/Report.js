import React from "react";
import Aside from "../Components/Aside";
import { useHistory } from "react-router-dom";

function Report() {
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
          <main className="job col-12">
            <header className="job__Title border-bottom border-dark">
              <h4>Productivity report</h4>
            </header>
          </main>
        </div>
      </div>
    </>
  );
}

export default Report;
