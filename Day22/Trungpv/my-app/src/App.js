import logo from './logo.svg';
import './App.css';
import Sig_in from './component/login/sig_in'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <>
          <Sig_in />
          {this.props.children}
      </>
      );
  }

}

export default App;
