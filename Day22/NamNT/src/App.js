import './App.css';

function App() {
  return (
    <div className="App">
      <main className="login">
        <section className="container">
          {/*Status bar*/}
          <div className="statusBar">
            {/*left*/}
            <div className="statusBar__time">
              <span className="time__hour">
                9:41
              </span>
            </div>
            {/*right*/}
            <div className="statusBar__icon">
              <img src="./images/connection.png" alt="No picture" />
              <i className="fas fa-wifi" />
              <i className="fas fa-battery-full" />
            </div>
          </div>
          {/*End status bar*/}
          {/*Image login*/}
          <div className="imgLogin">
            <img className="imgLogin__item" src="./images/user_login.png" alt="No picture" />
          </div>
          {/*End Image login*/}
          {/*Text Login*/}
          <div className="textLogin">
            <div className="textLogin__wellCome">
              <p className="wellCome__item">
                Wellcome Back!
              </p>
            </div>
            <div className="textLogin__please">
              <p className="please__item">
                Please, Login.
              </p>
            </div>
          </div>
          {/*End text login*/}
          {/*Input*/}
          <div className="input">
            <div className="input__login">
              <div className="login__user">
                <i className="far fa-user" />
                <input type="text" placeholder="Username" />
              </div>
            </div>
            <div className="input__login">
              <div className="login__user login__password">
                <i className="fas fa-key" />
                <input type="password" placeholder="Password" />
              </div>
            </div>
            {/*Continute*/}
            <div className="button__continue">
              <button className="continue__item" type="submit">
                <a className="item__link" href="#">
                  <span className="item--text">Continute</span>
                </a>
                <i className="fas fa-chevron-right" />
              </button>
            </div>
          </div>
          {/*End input*/}
          {/*Line*/}
          <div className="line">
            <legend>--------------------<pre>{"     "}Or{"     "}</pre>-------------------</legend>
          </div>
          {/*button create accounnt*/}
          <a className="createAccount" href="sign-up.html">
            <p>Create an Account</p>
          </a>
        </section>
      </main>
    </div>
  );
}

export default App;
