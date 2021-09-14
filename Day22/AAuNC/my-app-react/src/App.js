import "./App.css";
import Header from "./components/Header/Header.js";
import Banner from "./components/Banner/Banner.js";
import Text from "./components/Text/Text.js";
import Form from "./components/Form/Form.js";

function App() {
  return (
    <div id="l-login">
        <Header></Header>
        <div id="l-main">
          <Banner></Banner>
          <Text></Text>
          <Form></Form>
        </div>
    </div>   
  );
}

export default App;
