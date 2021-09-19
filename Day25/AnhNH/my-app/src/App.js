//css
import './App.css';
//components
import Routers from './components/routers/router';
//reactatrap
import 'bootstrap/dist/css/bootstrap.min.css';
//rowter
import { Container } from 'reactstrap';

function App() {
  const urlUse = `${process.env.REACT_APP_URL}users`;
  const signIn = (data) => {
    fetch(urlUse)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        result.map((item) => {
          if (data.userName === item.username && data.userPass === item.password) {
            localStorage.setItem('token', item.avatar);
            localStorage.setItem('name', item.fullname);
            alert("Đăng nhập thành công")
            window.location.replace('/timer');
            return null
          }
          else {
            alert("Tài khoản hoặc mật khẩu sai")
            return null
          }
        });
      });
  };
  return (
    <Container fluid={true}>
      <Routers signIn={signIn}></Routers>
    </Container>
  );
}
export default App;
