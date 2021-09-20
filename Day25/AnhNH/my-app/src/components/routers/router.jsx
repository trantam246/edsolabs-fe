import React from 'react'

//router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Col, Row } from 'reactstrap';
//components

import Profile from '../profile/profile';
import Report from '../report/report';
import Timer from '../timer/timer';
import Signin from '../signin/signin';
import Nav from '../nav/Nav';
import Err from '../404/404';

export default function Routers(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => {
                    return localStorage.getItem("token") ?<Row>
                        <Col lg="2" xs="12">
                            <Nav></Nav>
                        </Col>
                        <Col lg="10" xs="12" className="layoutRight">
                            <Timer></Timer>
                        </Col>
                    </Row> : <Redirect to="/"></Redirect>
                }}>
                    <Signin signIn={props.signIn}
                    ></Signin>
                </Route>
                <Route path="/timer" render={() => {
                    return localStorage.getItem("token") ?<Row>
                        <Col lg="2" xs="12">
                            <Nav></Nav>
                        </Col>
                        <Col lg="10" xs="12" className="layoutRight">
                            <Timer></Timer>
                        </Col>
                    </Row> : <Redirect to="/"></Redirect>
                }}/>

                <Route path="/report" render={() => {
                    return localStorage.getItem("token") ? <Row>
                        <Col lg="2" xs="12">
                            <Nav></Nav>
                        </Col>
                        <Col lg="10" xs="12" className="layoutRight">
                            <Report></Report>
                        </Col>
                    </Row> : <Redirect to="/"></Redirect>
                }}>

                </Route>
                <Route path="/profile" render={() => {
                    return localStorage.getItem("token") ? <Row>
                        <Col lg="2" xs="12">
                            <Nav></Nav>
                        </Col>
                        <Col lg="10" xs="12" className="layoutRight">
                            <Profile></Profile>
                        </Col>
                    </Row> : <Redirect to="/"></Redirect>
                }}>
                </Route>
                <Route path="/*">
                    <Err></Err>
                </Route>
            </Switch>
        </Router>
    )
}
