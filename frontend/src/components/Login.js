import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

class Login extends Component {

  constructor() {
	    super();
	    this.state = {
	      email: '',
	      password: '',
	      wrongCredentials: false
	    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
	    e.preventDefault();

	    const { email, password } = this.state;

	    axios.post('/loginForm', { email, password })
	      .then((res) => {
	    	  if(res.data){
	    		  this.props.history.push("/dashboard", {email: email, loggedin: true});
	    		  this.state.wrongCredentials = false;
	    	  } else {
	    		  this.props.history.push("/login");
	    		  this.state.wrongCredentials = true;
	    	  }
	    	  console.log(res);
	      });
  }
  
  renderError(){
	  if(this.state.wrongCredentials) {
	      return (
	    	<div className="alert alert-danger alert-dismissible show">
    	          <button type="button" className="close" data-dismiss="alert">&times;</button>
    	          <strong>Error!</strong> Wrong email id or password.
    	    </div>
	      );
	  } else {
	      return (
	    	<div></div>
	      );
	  }
  }
  
  render() {
	const { email, password } = this.state;
    return (
    		<div>
    			<Header email='Guest' loggedin={false} />
	    	    <section id="main">
	    	      <div className="container">
	    	        <div className="row">
	    	          <div className="col-md-4">
	    	          </div>
	    	          <div className="col-md-4">
	    	          {this.renderError()}
	    	          <form onSubmit={this.onSubmit}>
							<div className="form-group">
								<label for="published_date">Email:</label>
								<input type="email" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Email Address" />
								  </div>
								  <div className="form-group">
								<label for="publisher">Password:</label>
								<input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password" />
							</div>
		                    <div className="col-md-6">
		                    	<input type="checkbox" className="checkbox" />
		                    </div>
		                    <div className="col-md-6">
		                    	<span> Keep me signedin</span>
		                    </div>
		                    <br/>
		                    <button type="submit" className="btn btn-default">Login</button>
		                </form>
	    	          </div>
	    	          <div className="col-md-4">
	    	          </div>
	    	        </div>
	    	      </div>
	    	    </section>
	    	</div>
    );
  }
}

export default withRouter(Login);
