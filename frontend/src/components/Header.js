import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class TransferPopup extends Component {

  constructor() {
	    super();
	    this.state = {
	    		from: '',
	    		to: '', 
	    		amount: 0,
	    		password: ''
	    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
	    e.preventDefault();
	    const { from, to, amount, password } = this.state;
	    axios.post('/addTransaction', { from, to, amount })
	      		.then((res) => {
	      			console.log(res);
	      			var message = "Transaction Failed Please try again after sometime!!!";
	      			if(res.data.id != undefined && res.data.id != null){
	      				message = "Transferd Successfully!!!";
	      			}
	      			
	      			if (window.confirm(message)){
	      				this.props.closeTransferPopup();
	      			}
			    });
  }
  render() {
	 const { from, to, amount, password } = this.state;
     return (
	      <div className='popup'>
	        <div className="form-transfer-wrapper">
			    <form className="form-transfer" onSubmit={this.onSubmit} autocomplete="off">
			      <h2 className="form-transfer-heading">{this.props.text}</h2>
			      <input type="text" className="form-control" name="from" value={from} onChange={this.onChange} placeholder="From User" required="true" autofocus="" /> <br />
			      <input type="text" className="form-control" name="to" value={to} onChange={this.onChange} placeholder="To User" required="true" autofocus="" /> <br />
			      <input type="number" className="form-control" name="amount" value={amount} onChange={this.onChange} placeholder="Amount" required="true"/> <br />
			      <input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" required="true"/> <br />
			      
			      <div style={{'padding-bottom': '10px'}}>
		    	    <button className="btn btn-mx btn-danger" style={{float: 'left'}} type="submit">Send</button>
		    	    <button className="btn btn-mx" style={{float: 'right'}} onClick={this.props.closeTransferPopup}>Close</button>
			      </div>
			    </form>
			</div>
	      </div>
	 );
  }
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	      showTransferPopup: false
    };
  }
  

//// onSubmit = (e) => {
// e.preventDefault(); /
/// const { from, to, amount } = this.state; /
/// axios.post('/addTransaction', { from, to, amount })
// .then((res) => {
// if(res.data){
// this.props.history.push("/dashboard", {email: email, loggedin: true});
// this.state.wrongCredentials = false;
// } else {
// this.props.history.push("/login");
// this.state.wrongCredentials = true;
// }
// console.log(res);
// });
// }
 toggleTransferPopup() {
	    this.setState({
	      showTransferPopup: !this.state.showTransferPopup
	    });
  }
  
  render() {
    return (
    		<div>
		   		<nav className="navbar navbar-default">
		  	      <div className="container">
		  	        <div className="navbar-header">
		  	          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		  	            <span className="sr-only">Toggle navigation</span>
		  	            <span className="icon-bar"></span>
		  	            <span className="icon-bar"></span>
		  	            <span className="icon-bar"></span>
		  	          </button>
		  	          <a className="navbar-brand" href="#">ABCoins</a>
		  	        </div>
		  	        <div id="navbar" className="collapse navbar-collapse">
		  	          <ul className="nav navbar-nav">
		  	            <li className="active"><a href="#">Dashboard</a></li>
		  	            <li><a href="#">Transactions</a></li>
		  	            <li><a href="#">Blocks</a></li>
		  	            <li><a href="#">Users</a></li>
		  	          </ul>
		  	          <ul className="nav navbar-nav navbar-right">
		  	            <li><a href="#">Welcome, {this.props.email}</a></li>
		  	            <li>{this.props.loggedin ? <Link to="/login">Logout</Link> : <Link to="/login">Login</Link> }</li>
		  	          </ul>
		  	        </div>
		  	      </div>
		  	    </nav>
		  	
		  	    <header id="header">
		  	      <div className="container">
		  	        <div className="row">
		  	          <div className="col-md-10">
		  	            <h1><span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard <small>Manage Your Account</small></h1>
		  	          </div>
		  	          <div className="col-md-2">
				  	        {this.props.loggedin ?
				  	          	(<div className="dropdown create">
				  	              <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				  	                Actions
				  	                <span className="caret"></span>
				  	              </button>
				  	              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
				  	                <li><a href="#" type="button">Buy Coins</a></li>
				  	                <li><a href="#" type="button" onClick={this.toggleTransferPopup.bind(this)}>Transfer Coins</a></li>
				  	                <li><a href="#" type="button" >Request Coins</a></li>
				  	              </ul>
				  	            </div>) : ( <div></div> )
				  	        }
		  	          </div>
		  	        </div>
		  	      </div>
		  	    </header>
		  	  {this.state.showTransferPopup ? 
		  	          <TransferPopup text='Transfer Coins' closeTransferPopup={this.toggleTransferPopup.bind(this)} />
		  	          : <div></div>
		  	  }
	    	</div>
    );
  }
}

export default Header;
