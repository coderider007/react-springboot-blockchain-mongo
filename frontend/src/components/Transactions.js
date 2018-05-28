import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Transactions extends Component {

  constructor(props) {
	    super(props);
	    this.state = {
	    	transactions: []
	    };
  }
	
  componentDidMount() {
	    axios.get('/transactions')
	  .then(res => {
	    this.setState({ transactions: res.data });
	    console.log(this.state.transactions);
	  });
  }	

  render() {
    return (
    		<div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Latest Transactions</h3>
            </div>
            <div className="panel-body">
              <table className="table table-striped table-hover">
              	  <thead>
              		<tr>
                        <th>From</th>
                        <th>To</th>
                        <th>Amount</th>
                        <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
	                  {this.state.transactions.map(t =>
		                  <tr>
		                    <td>{t.from}</td>
		                    <td>{t.to}</td>
		                    <td>{t.amount}</td>
		                    <td>{t.timestamp}</td>
		                  </tr>
		              )}
                   </tbody>
                </table>
            </div>
          </div>
    );
  }
}

export default Transactions;
