import './Form.css';
import Line from '../Line/Line.js';

function Form() {
  return (
    <form action="" method="">
        <input className="input" type="email" name="email" placeholder="johnsondoe@nomail.com" tabIndex="1"/>

        <input className="input" type="password" name="password" placeholder="********************" tabIndex="2"/>

        <button className="btn submit" tabIndex="3">
            Continue
            <span className="icon-continue">
                <i className="fas fa-chevron-right"></i>
            </span>
        </button>
        
        <Line></Line>
    
        <a href="#" className="btn btn-link register" tabIndex="4">Create an Account</a>
    </form>
  );
}

export default Form;
