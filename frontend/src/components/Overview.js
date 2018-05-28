import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Overview extends Component {

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

  onChange = (e) => {
//    const state = this.state.contact
//    state[e.target.name] = e.target.value;
//    this.setState({contact:state});
  }

  onSubmit = (e) => {
//    e.preventDefault();
//
//    const { name, address, city, postalCode, phone } = this.state.contact;
//
//    axios.put('/contacts/'+this.props.match.params.id, { name, address, city, postalCode, phone })
//      .then((result) => {
//        this.props.history.push("/show/"+this.props.match.params.id)
//      });
  }

  render() {
    return (
    		<div className="panel panel-default">
            <div className="panel-heading main-color-bg">
              <h3 className="panel-title">Website Overview</h3>
            </div>
            <div className="panel-body">
              <div className="col-md-4">
                <div className="well dash-box">
                  <h2><span className="glyphicon glyphicon-user" aria-hidden="true"></span> {this.state.users.length}</h2>
                  <h4>Users</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="well dash-box">
                  <h2><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> {this.state.blocks.length}</h2>
                  <h4>Blocks</h4>
                </div>
              </div>
              <div className="col-md-4">
                <div className="well dash-box">
                  <h2><span className="glyphicon glyphicon-stats" aria-hidden="true"></span> { ((10 * (this.state.blocks.length -1)) + this.state.transactions.length) }</h2>
                  <h4>Transactions</h4>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Overview;
