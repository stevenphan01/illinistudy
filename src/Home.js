import './Home.css';
import React, {Component} from 'react';
import MapView from './MapView';
import ListView from './ListView';
import Axios from 'axios';

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
    //this.setState({user:""});
    /* Call api to search for user */
    console.log(this.state.user)
    Axios.post('http://localhost:3002/api/getuser', {
      username: this.state.user,
    }).then((e) => {
      e.data.map((result) =>{
        return console.log(result);
      }
      )
      //alert('success insert')
    })
  }
  handleSearchUser(e) {
    this.setState({user: e.target.value});
  }
  render() {
    //Change the userSearch to locSearch eventually
    return (<React.Fragment>
              <div className="userSearch" >
                  <button value="Submit" className="submitUser" onClick={(e)=>this.handleUserSubmit(e)}/>
                    <label>Search User: </label>
                    <input type="text" value={this.state.user} onChange={(e)=>this.handleSearchUser(e)}/>
              </div>
              <MapView/>
              <ListView/>
            </React.Fragment>)
  }
}

