import "./assets/css/style.css";
import banner from "./assets/img/Mask Group.png";
import Connection from "./assets/img/Cellular Connection.svg";
import Wifi from "./assets/img/Wifi.svg";
import Battery from "./assets/img/Battery.svg";

function App() {
  return (
    <div className="container container--login">
      {/* <!-- status bar --> */}
      <div className="status-bar">
        <div className="status-bar__time">9:41</div>

        <div className="status-bar__icon">
          <img src={Connection} alt="connection" />
          <img src={Wifi} alt="Wifi" />
          <img src={Battery} alt="Battery" />
        </div>
      </div>

      {/* <!-- banner --> */}
      <div className="banner banner--login">
        <img src={banner} alt="" />
      </div>

      {/* <!-- title --> */}
      <div className="title">
        <p className="title__header">Welcome Back!</p>
        <h2 className="title__sub">Please, Log In.</h2>
      </div>

      {/* <!-- form --> */}
      <div className="form form--login">
        {/* <!-- login --> */}
        <form action="">
          <input
            className="form__input icon icon--user"
            type="email"
            placeholder="johnsondoe@gmail.com"
          />

          <input
            className="form__input form__input--password icon icon--key"
            type="password"
            placeholder="**************"
          />

          <button className="button button--continue">
            Continue
            <span className="icon--continue">
              <i className="fas fa-chevron-right"></i>
            </span>
          </button>

          {/* <!-- or --> */}
          <div>
            <fieldset className="fieldset">
              <legend>Or</legend>
            </fieldset>
          </div>

          {/* <!-- create --> */}

          <div className="button button--create">
            <a href="facebook.com">Create an Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
