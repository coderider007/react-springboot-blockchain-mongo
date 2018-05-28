import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Dashboard from './Dashboard';
import Overview from './Overview';
import UserList from './UserList';
import Blocks from './Blocks';
import Transactions from './Transactions';

class App extends Component {

  constructor(props) {
    super(props);
   // console.log('App Component props = ' + props);
    this.state = props.location.state;
    if(this.state == undefined || this.state == null){
    	this.state = {};
    	this.state.email = 'Guest';
    	this.state.loggedin = false;
    }
//      contacts: []
//    };
  }

//  componentDidMount() {
//    axios.get('/contacts')
//      .then(res => {
//        this.setState({ contacts: res.data });
//        console.log(this.state.contacts);
//      });
//  }

//<section id="breadcrumb">
//  <div className="container">
//    <ol className="breadcrumb">
//      <li className="active">Dashboard</li>
//    </ol>
//  </div>
//</section>
  
  render() {
    return (
    		<div>
    			<Header email={this.state.email} loggedin={this.state.loggedin} />
	
	    	    <section id="main">
	    	      <div className="container">
	    	        <div className="row">
	    	          <div className="col-md-3">
		    	        <Dashboard />
	    	          </div>
	    	          <div className="col-md-9">
	    	            <Overview />
	    	            <UserList />
	    	            <Blocks />
	    	            <Transactions />
	    	          </div>
	    	        </div>
	    	      </div>
	    	    </section>
	    	</div>
    );
  }
}

export default App;
