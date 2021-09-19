import React, { useState } from 'react'
import { Route, Router, Switch } from 'react-router'
import Home from './page/Home/Home'
import Login from './page/Login/Index'


const Routers = () => {


    return (
        <Router >
            <Switch>
                <Route path="/timer">
                    <Home />
                </Route>
                <Route exact path="/">
                    <Login />
                </Route>
            </Switch>
        </Router>
    )
}

export default Routers
