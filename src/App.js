import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";


class App extends React.Component {
  
 

  render() {

    
   //web3.eth.requestAccounts().then(accounts => {console.log(accounts)}); //line use to confirm that we've retrieved accounts from metamask
   
    return (
      <div>
      <header>The Lottery App:{lottery.options.address}</header>
      </div>
    );
  }
}
export default App;
