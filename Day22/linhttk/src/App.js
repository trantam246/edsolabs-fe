import './App.css';
import connection from './img/connection.png';
import wifi from './img/wifi.png';
import battery from './img/battery.png';
import backgroundLogin from './img/Mask Group.png';
import user from './img/user.png';
import key from './img/key.png';

function App() {
  return (
    <div className="app sign-in">
      <div className="layout-status-bar">
        <div className="time">9:41</div>
        <div className="header">
          <img src={connection} alt="" className="header--connection"></img>
          <img src={wifi} alt="" className="header--wifi"></img>
          <img src={battery} alt="" className="header--battery"></img>
        </div>
      </div>
      <img src={backgroundLogin} alt="" className="layout-mask__img"></img>
      <div className="layout-frame">
        <div className="title-first">Welcome Back!</div>
        <div className="title-second">Please, Log In.</div>
      </div>
      <form action="" className="layout-main">
        <div className="input-user">
          <img src={user} alt="" className="input-user__img"></img>
          <input
            type="text"
            className="input-user__text"
            placeholder="johnsondoe@nomail.com"
          ></input>
        </div>
        <div className="input-password">
          <img src={key} alt="" className="input-password__img"></img>
          <input
            type="password"
            className="input-password__text"
            placeholder="******************"
          ></input>
        </div>
        <button className="btn__primary" type="submit">
          Continue
          <i className="icon fas fa-chevron-right"></i>
        </button>
        <a className="btn__secondary" href="./sign-up.html">
          Create an Account
        </a>
      </form>
      <span className="layout-separator">Or</span>
    </div>
  );
}

export default App;
