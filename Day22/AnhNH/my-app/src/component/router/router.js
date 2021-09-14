import SignIn from "../sign_in/signin";
import SignUp from "../sign_up/signup";
import React from "react";
import {BrowserRouter as Router,Route,} from "react-router-dom";
function Routers() {
    return (
        <Router>
            <div>
                <Route exact path="/" component={SignUp}/>
                <Route exact path="/signin" component={SignIn}/>
                <Route exact path="/signup" component={SignUp}/>
            </div>
        </Router>
    );
}
export default Routers;
