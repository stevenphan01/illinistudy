import './Home.css';
import React, {Component} from 'react';
import MapView from './MapView';
import ListView from './ListView';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSearchUser = this.handleSearchUser.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.state = {
      "user": "",
      "displayedUsers": []
    }
  }
  handleUserSubmit(e) {
    e.preventDefault();
    this.setState({user:""});
    /* Call api to search for user */
  }
  handleSearchUser(e) {
    this.setState({user: e.target.value});
  }
  render() {
    //Change the userSearch to locSearch eventually
    return (<React.Fragment>
              <div className="userSearch" >
                  <form className="submitUser" onSubmit={(e)=>this.handleUserSubmit(e)}>
                    <label>Search User: </label>
                    <input type="text" value={this.state.user} onChange={(e)=>this.handleSearchUser(e)}/>
                  </form>
              </div>
              <MapView/>
              <ListView/>
            </React.Fragment>)
  }
}

