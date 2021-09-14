import img1 from './images/img1.png';
import './App.css';

function App() {
  return (
    <main className="container">
    <img src={img1} alt="" className="page-image" />
    <h4>Welcome Back!</h4>
    <h2>Please, Log In.</h2>
    <form action method="post" className="form form-sign-in">
      <div className="form-row">
        <i className="icon icon-user" />
        <input type="email" name="email" placeholder="johnsondoe@nomail.com" autoComplete="off" />
      </div>
      <div className="form-row">
        <i className="icon icon-key" />
        <input type="password" name="password" placeholder="********************" />
      </div>
      <button type="submit" className="btn">
        Continue <i className="icon icon-chevron-right" />
      </button>
      <div className="separator">Or</div>
      <a href="https://www.google.com.vn/" className="btn btn-link"> Create an Account </a>
    </form>
  </main>
  );
}

export default App;
