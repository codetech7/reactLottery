import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";


class App extends React.Component {

  state = {
    manager : ''
  }

  async componentDidMount() {
   const manager = await lottery.methods.manager().call();
   this.setState({manager : manager});
  }
  
 

  render() {

    
   //web3.eth.requestAccounts().then(accounts => {console.log(accounts)}); //line use to confirm that we've retrieved accounts from metamask
   const manager = lottery.methods.manager().call() // get the manager of the contract via the public interface declared for public manager variable;
    return (
      <div>
      <header>The Lottery App was created by: {this.state.manager}</header>
      </div>
    );
  }
}
export default App;
