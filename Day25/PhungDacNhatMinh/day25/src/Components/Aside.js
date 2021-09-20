import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../api/api";
Aside.propTypes = {};

function Aside(props) {
  const [data, setData] = useState(() => {
    getUser()
      .then((res) => res.data)
      .then((e) => {
        setData(e);
      })
      .catch(() => {})
      .finally(() => {});
  });
  const handleLogout = () => {
    localStorage.clear();
  };
  return (
    <aside className="main__aside col-3 border-end border-dark">
      {typeof data === "object" ? (
        <div className="info d-flex align-items-center">
          <img src={data[0].avatar} alt="" className="info__img" />
          <h6 className="info__name">{data[0].fullname}</h6>
        </div>
      ) : (
        ""
      )}
      <div id="myLink" className="nav flex-column ms-4">
        <Link className="nav__item my-1 " to="/Timer">
          <i className="far fa-clock me-2"></i>
          Timer
        </Link>
        <Link className="nav__item my-1 " to="/Report">
          <i className="far fa-chart-bar me-2"></i>
          Report
        </Link>
        <Link className="nav__item my-1 btn-link" to="/" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i>
          Logout
        </Link>
      </div>
    </aside>
  );
}

export default Aside;
