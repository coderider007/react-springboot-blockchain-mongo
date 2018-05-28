import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      blocks: [],
      transactions: []
    };
  }

  componentDidMount() {
	  axios.get('/users')
	      .then(res => {
	        this.setState({ users: res.data });
	        console.log(this.state.users);
	  });
	  axios.get('/blocks')
	    .then(res => {
	      this.setState({ blocks: res.data });
	      console.log(this.state.blocks);
	  });
	  axios.get('/transactions')
	    .then(res => {
	      this.setState({ transactions: res.data });
	      console.log(this.state.transactions);
	  });
  }
	
  render() {
    return (
    		<div>  
          	<div className="list-group">
              <a href="index.html" className="list-group-item active main-color-bg">
                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span> Dashboard
              </a>
              <a href="#" className="list-group-item"><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> Blocks <span className="badge">{this.state.blocks.length}</span></a>
              <a href="#" className="list-group-item"><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> Transactions <span className="badge">{ ((10 * (this.state.blocks.length -1)) + this.state.transactions.length) }</span></a>
              <a href="#" className="list-group-item"><span className="glyphicon glyphicon-user" aria-hidden="true"></span> Users <span className="badge">{this.state.users.length}</span></a>
            </div>
            
            <div className="list-group">
              <span className="list-group-item active main-color-bg">
                <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> System Health
              </span>
              <span className="list-group-item">
              	<h4>Disk Space Used</h4>
				<div className="progress">
					<div className="progress-bar" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" style={{width: '10%'}}>
                      10%
					</div>
				</div>
              </span>
              <span className="list-group-item">
              	<h4>Bandwidth Used </h4>
				<div className="progress">
					<div className="progress-bar" role="progressbar" aria-valuenow="5" aria-valuemin="0" aria-valuemax="100" style={{width: '5%'}}>
                    5%
					</div>
				</div>
              </span>
            </div>
          </div>
    );
  }
}

export default Dashboard;
