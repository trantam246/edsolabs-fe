import React from 'react'
// style
import "./style.css";

//reacticon
import { BiTime } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegChartBar } from "react-icons/fa";

//reacttrap
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'reactstrap';


export default function Nav() {
    return (
        <>
            <div className="nav border-end d-flex text-center">
                <Row>
                    <Col className="col-lg-12 col-xs-3">
                        <NavLink exact to="/profile" className="nav__item">
                            <img src={localStorage.getItem("token")} alt="" className="border rounded-circle w-25 me-2" />
                            <span >{localStorage.getItem("name")}</span>
                        </NavLink>
                    </Col>
                    <Col className="col-lg-12 col-xs-3">
                        <NavLink exact to="/timer" className="nav__item">
                            <BiTime size="24"></BiTime> Timer
                        </NavLink >
                    </Col>
                    <Col className="col-lg-12 col-xs-3">
                        <NavLink exact to="/report" className="nav__item">
                            <FaRegChartBar size="24"></FaRegChartBar> Report
                        </NavLink >
                    </Col>
                    <Col className="col-lg-12 col-xs-3">
                        <NavLink exact to="/" className="nav__item" onClick={() => {
                            localStorage.removeItem("token")
                            localStorage.removeItem("name")
                        }}>
                            <RiLogoutBoxRLine size="24" />Logout
                        </NavLink >
                    </Col>
                </Row>

            </div>
        </>

    )
}
