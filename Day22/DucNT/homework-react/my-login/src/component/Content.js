import '../assets/style/style.css';
import icon_user from '../assets/img/user.png';
import icon_key from '../assets/img/key.png';
import continue_ from '../assets/img/Continue 􀯻.png';

function Content() {
  return (
    <div>
      <section className="main-section">
          <h4>Welcome Back!</h4>
          <h2>Please, Log In.</h2>
            <form action="" method="post" class="form form-sign-in">
          <div class="form-row">
          <img src = {icon_user} alt ="Icon user" class="icon icon-user"/>
          <input
            type="email"
            name="email"
            placeholder="johnsondoe@nomail.com"
            autocomplete="off"
          />
        </div>
        <div class="form-row">
          <img src ={icon_key} alt ="Icon key" class= "icon icon-key" />
          <input
            type="password"
            name="password"
            placeholder="********************"
          />
        </div>
        <button type="submit" class="btn btn-submit">
          <img src ={continue_} alt="chervol-right"/>
        </button>
        <div class="separator">Or</div>
         <div class="btn-link-rel">
                <a href="">
                    <input type="button" value="Create an Account"/>
                </a>
          </div>
      </form>
      </section>
    </div>
  );
}

export default Content;
