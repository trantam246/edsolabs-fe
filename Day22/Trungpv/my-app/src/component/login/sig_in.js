import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";
class sig_in extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          email : '',
          password: '',
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;
        // console.log(nameInput)
        // console.log(value)
        this.setState({
          [nameInput]: value
        })
      }
      handleSubmit(e) {
        e.preventDefault();
        let flag = true
        let email = this.state.email;
        let password = this.state.password;
        let errorSubmit = this.state.formErrors;
    
        if(!email) {
          flag = false;
          errorSubmit.email = "Vui long nhap email";
        }
        if(!password) {
          flag = false;
          errorSubmit.password = "Vui long nhap password";
        }
    
        if(!flag) {
          this.setState({
              formErrors: errorSubmit
          });
        }  
        if(flag) {
            alert("Dang nhap thanh cong")
        }
       
      }
    render(){
        return (
            <div className="container">
                {/* status bar */}
                <div className="l-nav">
                <ul className="nav_list">
                    <li className="nav_items">9:41</li>
                </ul>
                <ul className="nav_list">
                    <li className="nav_items"><i className="fas fa-signal" /></li>
                    <li className="nav_items"><i className="fas fa-wifi" /></li>
                    <li className="nav_items"><i className="fas fa-battery-full" /></li>
                </ul>
                </div>
                <div className="content">
                {/* banner */}
                <div className="l-content_img">
                    <img src="img/Mask Group.png" title="ảnh content page" />
                </div>
                {/* title */}
                <div className="l-title">
                    <span>Welcome back</span>
                    <p>Please, Log In.</p>
                </div>
                {/* form */}	
                <form method="#POST" className="l-form" onSubmit={this.handleSubmit}>
                    <div className="form_login_icon">
                    <i className="far fa-user icon_input" />
                    <input className="form_login_input content--email"  onChange={this.handleInput} type="email" name="email" placeholder="johnsondoe@nomail.com" /> <br />
                    </div>
                    <div className="form_login_icon">
                    <i className="fas fa-key icon_input" />
                    <input className="form_login_input content--pass"  onChange={this.handleInput} type="password" name="password" placeholder="********************" />
                    </div>
                    <button type="submit" className="btn form_btn">Continue  <i className="fas fa-angle-right icon--right" /></button>
                </form>
                {/* or */}
                <div>
                    <fieldset className="fieldset">
                    <legend>Or</legend>
                    </fieldset>
                </div>
                {/* create */}
                <div className="button button-create">
                    <Link to="sigup.html">
                    Create an Account
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}
  export default sig_in;