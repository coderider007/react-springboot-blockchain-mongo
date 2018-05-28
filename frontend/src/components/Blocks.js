import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Blocks extends Component {

  constructor(props) {
	    super(props);
	    this.state = {
	    	blocks: []
	    };
  }
	
  componentDidMount() {
	    axios.get('/blocks')
	  .then(res => {
	    this.setState({ blocks: res.data });
	    console.log(this.state.blocks);
	  });
  }	

  render() {
    return (
    		<div className="panel panel-default">
	            <div className="panel-heading">
	              <h3 className="panel-title">Blocks</h3>
	            </div>
	            <div className="panel-body">
		            <div className="list-group">
		            	{this.state.blocks.reverse().map((b, index) =>
		            	<div>
		            	<a data-toggle="collapse" href={'#blockTransactionCollapse_' + index }>
		            		<span className="list-group-item block-color-bg">
		            			<table className="table table-hover">
			                    	  <thead>
			                    		<tr>
			                              <th>Block #</th>
			                              <th>{b.index}</th>
			                          </tr>
			                        </thead>
			                        <tbody>
			      		                  <tr>
				      		                  <td>Time Stamp</td>
				      		                  <td>{b.timeStamp}</td>
			      		                  </tr>
			      		                  <tr>
				      		                  <td>Nonce</td>
				      		                  <td>{b.nonce}</td>
			      		                  </tr>
			      		                  <tr>
				      		                  <td>Hash</td>
				      		                  <td>{b.hash}</td>
			      		                  </tr>
			      		                  <tr>
				      		                  <td>Previous Hash</td>
				      		                  <td>{b.previousHash}</td>
			      		                  </tr>
			      		                  <tr>
				      		                  <td>Merkle Root</td>
				      		                  <td>{b.merkleRoot}</td>
			      		                  </tr>
			                         </tbody>
			                    </table>
			                </span>
			            </a>
	
			            <div id={'blockTransactionCollapse_' + index } className="panel-collapse collapse">
				              <div className="panel panel-default">
					              <div className="panel-heading">
					                <h3 className="panel-title">Transactions</h3>
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
					  	                  {b.transactions.map(t =>
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
				        </div>
				        <br></br>
				        </div>
			            )}
		            
	            	</div>
	            </div>
          </div>
    );
  }
}

export default Blocks;
