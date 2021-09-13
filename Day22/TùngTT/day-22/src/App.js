import './App.css';
import battery from './img/Battery.png';
import wifi from './img/Wifi.png';
import cellular from './img/Cellular Connection.png';
import logo from './img/Sally-4 1@2x.png';
import user from './img/user.png';
import key from './img/key.png';
function App() {
  return (
    <div className="box sign-in">
      <div className="container">
        <div className="container_header">
          <div className="navbar">
            <div className="navbar__time">
              9:41
            </div>
            <div className="navbar__battery">
              <img src={cellular} className="navbar__icon navbar--icon--cellular" alt="Cellular"/>
              <img src={wifi} className="navbar__icon navbar--icon--wifi" alt="Wifi"/>
              <img src={battery} className="navbar__icon navbar--icon--battery" alt="Battery"/>
            </div>
          </div>
          <div className="container__logo">
            <img className="logo" src={logo} alt="Logo"/>
            <div className="container__logo__text">
              <p>Welcome back!</p>
              <h1>Please, Log In.</h1>
            </div>
          </div>
        </div>
        <div className="container__content">
          <form className="input__field">
            <div className="btn input--content">
              <img src={ user } alt="user"/>
              <input type="text" placeholder="johnsondoe@nomail.com"/>
            </div>
            <div className="btn input--content">
              <img src={key} alt="key"/>
              <input type="password" minlength="8" required placeholder="*****************"/>
            </div>
            <div className="btn input--content">
              <button className="input__btn sign--in--btn" type="submit">Continue ></button>
            </div>
          </form>
        </div>
        <div className="container__footer">
          <div className="option__text">
            <span className="text">Or</span>
          </div> 
          <div className="btn footer--btn">
            <a className="btn__footer" href="sign-up.html">
              <span>Create an Accounts</span>
            </a>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default App;
