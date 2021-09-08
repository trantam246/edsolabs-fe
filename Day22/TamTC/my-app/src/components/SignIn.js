import './SignIn.css'
const SignIn = () => {
    return (
        <main className="container">
            <img className="container__image" src="./images/login.png" alt="Sign In" />
            <div className="container__title">
                <span className="title__welcome">Welcome Back!</span>
                <h2 className="title__login">Please, Log In.</h2>
            </div>
            <form className="container__form" action method="post">
                <div className="form__item form__item--user">
                    <i className="form__icon form__icon--user far fa-user " />
                    <input type="email" name="email" className="form__input form__input--user" placeholder="johnsondoe@nomail.com" autoComplete="off" />
                </div>
                <div className="form__item form__item--password">
                    <img className="form__icon form__icon--password" src="./images/key.svg" alt="key" />
                    <input type="password" name="password" className="form__input form__input--password" placeholder="********************" />
                </div>
                <button className="form__btn--submit btn" type="submit">
                    Continue <i className="fas fa-chevron-right " />
                </button>
                <div className="form__separator">
                    <fieldset>
                        <legend>Or</legend>
                    </fieldset>
                </div>
                <a className="form__switch btn" href="./sign-up.html">Create an Account</a>
            </form>
        </main>
    )
}
export default SignIn