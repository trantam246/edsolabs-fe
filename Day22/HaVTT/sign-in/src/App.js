import './App.css';
import login from './img/login.png';
import user from './img/user.png';
import key from './img/key.png';

function App() {
  return (
    <div className="App main-login">
        <header className="l-header">
            <img src={login} alt="" className="l-header__img"></img>
        </header>
        <div className="l-container">
            <div className="container__title">
                <span className="container__title-welcome">Welcome Back!</span>
                <h1 className="container__title-content">Please, Log In.</h1>
            </div>
            <div className="container__form">
                <form action="" className="form">
                    <div className="form__input">
                        <img src={user} alt="" className = "input__icon"></img>
                        <input type="text" className="btn-base form__input--user " placeholder="Username"></input>
                    </div>
                    <div className=" form__input">
                        <img src={key} alt="" className="input__icon"></img>
                        <input type="password" className="btn-base form__input--password " placeholder="Password"></input>
                    </div>
                    <div className="form__submit ">
                        <button type="submit" className="btn-submit btn-submit--signin btn-base">
                            <span>Continue <i className="fas fa-greater-than"></i></span>
                        </button>
                    </div>
                </form>
            </div>
            <div className="container__separator">
                <fieldset>
                    <legend>Or</legend>
                </fieldset>
            </div>
        </div>
        <footer className="l-footer">
            <a href="#" className="footer__switch footer__switch--signin btn-base">Create an Account</a>
        </footer>
    </div>
  );
}

export default App;
