import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserList extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	users: []
    };
  }

  componentDidMount() {
    axios.get('/users')
      .then(res => {
    	  if(res.data.length > 5){
    		  var size = 5;
    		  var items = res.data.slice(0, size);
    		  this.setState({ users: items });
    	  } else {
    		  this.setState({ users: res.data });
    	  }
        console.log(this.state.users);
      });
  }	

render() {
    return (
    		<div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Latest Users</h3>
            </div>
            <div className="panel-body">
              <table className="table table-striped table-hover">
              	  <thead>
              		<tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined</th>
                    </tr>
                  </thead>
                  <tbody>
	                  {this.state.users.map(c =>
		                  <tr>
		                    <td>{c.name}</td>
		                    <td>{c.email}</td>
		                    <td>{c.creationDate}</td>
		                  </tr>
		              )}
                   </tbody>
                </table>
            </div>
          </div>
    );
  }
}

export default UserList;
