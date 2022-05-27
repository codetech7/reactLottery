import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";
import Pickwinner from './Pickwinner';


class App extends React.Component {

  state = {
    manager : '',
    players :"",
    balance: '',
    input: '',
    message: "",
    success: false,
    balanceLeft: "",
    isManager: false,
    displayMessage: ''
  }

  async componentDidMount() {
   const tempAccountsList = await web3.eth.requestAccounts();
   

   const manager = await lottery.methods.manager().call();
   const balance = await web3.eth.getBalance(lottery.options.address);
   const players = await lottery.methods.numberOfPlayers().call();
   const balanceLeft = await web3.eth.getBalance(tempAccountsList[0]);

   this.setState({players}); //number of people currently using the contract.
   this.setState({manager}); //set the creator of the contract, person calling it
   this.setState({balance}); //set the balance
   this.setState({balanceLeft}); // set the balance left 

   console.log(tempAccountsList[0]);
   
  }

  // inputToEnter = (param) => { //input event handler
  //   this.setState({value: param});
  // }

  submit = async (event) =>{  // submit event handler
    event.preventDefault(); //use prevent default for onclick and onsubmit events

    const accounts = await web3.eth.requestAccounts();

    this.setState({message: "pLEASE WAIT YOUR TRANSACTION IS PROCESSING"});

      let input = web3.utils.toBN(web3.utils.toWei(this.state.input, 'ether'), 'wei');

      try{

      await lottery.methods.enter().send({from:accounts[0], value: input});
      }catch(err){console.log(err);}

      this.setState({message : "Transaction finished"});
      this.setState({success: true});

      //calls to auto reset number of players and the total pool after transaction is complete;
      this.setState({balance: await web3.eth.getBalance(lottery.options.address)}); //reset the new balance after entering the lottery
      this.setState({players: await lottery.methods.numberOfPlayers().call()}); //reset the new number of players after entering the lottery
      const listOfPlayers = await lottery.methods.playerList().call(); //get array of all the players who have enetred the lottery 
      this.setState({balanceLeft: await web3.eth.getBalance(listOfPlayers[this.state.players - 1])}); //get the balance of the last player to enter the lottery, which is current user of the smart contract.
  }

  pickWinner = async () =>{
    if(this.state.isManager === true){
    const lotteryAccounts = await lottery.methods.manager().call(); //get the manager of the contract
    await lottery.methods.pickWinner().send({from: lotteryAccounts }); //send the manager to pickWinner
    this.setState({displayMessage: "You have successfully ended the lottery. Please proceed to congratulate the winners"});
    }

    else{
      this.setState({displayMessage: "You can only see the pickWinner button for transparency but only the manager can actually pick winners"});
    }
  }

  render() {

    
   //web3.eth.requestAccounts().then(accounts => {console.log(accounts)}); //line use to confirm that we've retrieved accounts from metamask
   //const manager = lottery.methods.manager().call() // get the manager of the contract via the public interface declared for public manager variable;
    return (
      <div>
        <header>The Lottery App was created by: <code>{this.state.manager}</code></header>
        <hr />
        <h3>Try your luck</h3>
        <div>Currently there are  <code>{this.state.players}</code> number of players and the total price pool to win is <code>{web3.utils.fromWei(this.state.balance, 'ether')} ether</code></div>
        <div>You have {web3.utils.fromWei(this.state.balanceLeft, "ether")} ether left in your wallet</div>

        <form onSubmit={event => this.submit(event)}>

          <label>Amount to enter</label>
          <input value={this.state.input} type="number" onChange={event => { this.setState({ input: event.target.value }); } } />
          <button>Enter Lottery</button>

        </form>
      
        <hr />
        <p>{this.state.message}</p>

        <Pickwinner isManager = {this.state.isManager}  pickWinner = {this.pickWinner} displayMessage = {this.state.displayMessage}/>
      </div>
    );
  }
}
export default App;
