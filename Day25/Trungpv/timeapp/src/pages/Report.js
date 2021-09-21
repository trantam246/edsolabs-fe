import React from "react";
import Admin from "../components/login/Admin";
import { useHistory } from "react-router-dom";

function Report() {
  const history = useHistory();
  if (localStorage.getItem("user") === null) {
    alert("vui long dap nhap");
    history.push("/");
  }
  return (
    <>
      <div>
        <div className="d-flex">
          <Admin />
          <div className="col-12">
            <div className="border-bottom border-dark">
              <h3>report</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;