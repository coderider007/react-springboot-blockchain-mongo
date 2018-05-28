import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
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
    			<Header email='Guest' loggedin={false} />
	
	    	    <section id="main">
	    	      <div className="container">
	    	        <div className="row">
	    	          <div className="col-md-3">
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
	    	          <div className="col-md-9">
	    	          <div className="panel panel-default">
		    	            <div className="panel-heading main-color-bg">
		    	              <h3 className="panel-title">Website Overview</h3>
		    	            </div>
		    	            <div className="panel-body">
		    	              <div className="col-md-12">
		    	                <div className="well dash-box">
		    	                  <h4></h4>
		    	                  	ABCoins provides distributed cryptocurrency. Which is robust and immbutable by nature.
		    	                  	<br/>
		    	                  	Login to see your account details.
		    	                  <p>Users</p>
		    	                </div>
		    	              </div>
		    	            </div>
		    	          </div>
	    	          </div>
	    	        </div>
	    	      </div>
	    	    </section>
	    	</div>
    );
  }
}

export default HomePage;
