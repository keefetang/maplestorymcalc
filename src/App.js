import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import Calculator from './Components/Calculator';


class App extends Component {
  
  render() {
    return (
      <div>
        <Navbar />
        <Calculator />
      </div>
    );
  }
}

export default App;
