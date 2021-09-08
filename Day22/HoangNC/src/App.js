import Connection from './img/Connection.png';
import Wifi from './img/Wifi.png';
import Battery from './img/Battery.png';
import backgroundLogin from './img/Sally-4 1.png';
import user from './img/user.png';
import key from './img/key.png';
import './App.css';

function App() {
  return (
    <div className="app sign-in">
        <div className = "l-status-bar">
            <div className = "time">9:41
            </div>
            <div className = "noti">
                <img src={Connection} alt="" className = "noti--connection"></img>
                <img src={Wifi} alt="" className = "noti--wifi"></img>
                <img src={Battery} alt="" className = "noti--battery"></img>
            </div>
        </div>
            <img src={backgroundLogin} alt="" className = "l-mask__img"></img>
        <div className = "l-frame">
            <div className = "title-first">Welcome Back!</div>
            <div className = "title-second">Please, Log In.</div>
        </div>
        <form action="" className = "l-main">
            <div className = "input-user">
                <img src={user} alt="" className = "input-user__img"></img>
                <input type="text" className = "input-user__text" placeholder="johnsondoe@nomail.com"></input>
            </div>
            <div className = "input-password">
                <img src={key} alt="" className = "input-password__img"></img>
                <input type="password" className = "input-password__text" placeholder="******************"></input>
            </div>
            <button className = "btn__primary" type="submit">
                Continue<i className = "icon fas fa-chevron-right"></i>
            </button>
            <a className = "btn__secondary" href="./sign-up.html">Create an Account</a>
        </form>
        <span className = "l-separator">Or</span>
    </div>
  );
}

export default App;
