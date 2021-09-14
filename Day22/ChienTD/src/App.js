// import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="l-status">
            <div className="left_status_bar style-content-status"><span>9:41</span></div>
            <div className="right_status_bar style-content-status">
                <i className="fas fa-signal" />
                <i className="fas fa-wifi" />
                <i className="fas fa-battery-full" />
            </div>
        </div>
        <div className="l-main">
            <div className="header">
                <img src="./assets/img/img-login.png" alt="đây là ảnh nền mục login"/>
            </div>
            <div className="title_page">
                <p>Welcome Back!</p>
                <p>Please, Log In.</p>
            </div>
            <form className="form">
                <div className="user style_input">
                    <img src="./assets/icon/user.png" alt="đây là ảnh"/>
                    <input type="text" defaultValue="johnsondoe@nomail.com"/>
                </div>
                <div className="password style_input">
                    <img src="./assets/icon/key.png" alt="đây là ảnh"/>
                    <input type="password" defaultValue="ádasdasdasdasdsdđáádasd"/>
                </div>
                <button className="continue style_input sumbit is-hover" type="submit">
                    <span>Continue <i className="fas fa-chevron-right"/></span>
                </button>
            </form>
            <div className="or">
                <span> Or </span>
            </div>
            <div className="create change_page is-hover">
                Create an Account
            </div>
        </div>
    </div>
    </div>
  );
}

export default App;
