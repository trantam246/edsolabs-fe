import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../utils/common";

function Admin() {
  const [data, setData] = useState(() => {
    getUser()
      .then((res) => res.data)
      .then((e) => {
        setData(e);
      })
      .catch(() => {})
      .finally(() => {});
  });
  const Logout = () => {
    localStorage.clear();
  };
  return (
    <div className="admin__dashbord col-3 border-end border-dark">
      {typeof data === "object" ? (
        <div className="info d-flex align-items-center">
          <img src={data[0].avatar} alt="" className="admin__img" />
          <h5 className="admin__name">{data[0].fullname}</h5>
        </div>
      ) : (
        ""
      )}
      <div className="nav flex-column ms-4">
        <Link className="nav__item " to="/Timer">
          <i className="far fa-clock me-2"></i>
          Timer
        </Link>
        <Link className="nav__item " to="/Report">
          <i className="far fa-chart-bar me-2"></i>
          Report
        </Link>
        <Link className="nav__item btn-link" to="/" onClick={Logout}>
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Admin;