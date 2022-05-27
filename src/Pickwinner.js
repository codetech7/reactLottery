import React, {Component} from 'react';

class Pickwinner extends Component {
    

    render(){
        // if(this.props.isManager === false){
        //     return (<div>You have successfully Entered the lottery. Only Manager can pick </div>) ;
        // }

        return (
           <div>
               <button onClick = {this.props.pickWinner}>PickWinner</button>
               <code>{this.props.displayMessage}</code>
            </div>
            );
    }
}

export default Pickwinner;