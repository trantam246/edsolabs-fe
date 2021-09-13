import "./App.css";
import "./assets/css/reset.css";
import "./fonts/SFProDisplay-BlackItalic.woff";
import img from "./assets/images/img1.png";

function App() {
  return (
    <div className="App">
      <main className="sign-in-page container">
        <section className="status">
          <ul className="l-status">
            <li className="time">
              <span className="">9:41</span>
            </li>
            <li className="status-group">
              <i className="cellular-bg"></i>
              <i className="wifi-bg"></i>
              <i className="Battery-bg"></i>
            </li>
          </ul>
        </section>
        <section className="content">
          <img src={img} alt="" className="page-image" />
          <h4>Welcome Back!</h4>
          <h2>Please, Log In.</h2>
          <form action="" method="post" className="form form-sign-in">
            <div className="form-row">
              <i className="icon icon-user"></i>
              <input
                type="email"
                name="email"
                placeholder="johnsondoe@nomail.com"
                autocomplete="off"
              />
            </div>
            <div className="form-row">
              <i className="icon icon-key"></i>
              <input
                type="password"
                name="password"
                placeholder="********************"
              />
            </div>
            <button type="submit" className="btn">
              Continue <i className="icon icon-chevron-right"></i>
            </button>
            <div className="separator">Or</div>
            <a href="sign-up.html" className="btn btn-link">
              {" "}
              Create an Account{" "}
            </a>
          </form>
        </section>
      </main>
    </div>
  );
}

export default App;
