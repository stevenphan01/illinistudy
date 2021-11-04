import './Home.css';
import React, {Component} from 'react';
import MapView from './MapView';
import ListView from './ListView';
import Axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleUserID = this.handleUserID.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleAdvancedQuery1 = this.handleAdvancedQuery1.bind(this);
    this.handleAdvancedQuery2 = this.handleAdvancedQuery2.bind(this);
    this.state = {
      "user_id": "",
      "username": "",
      "password": "",
      "email": "",
      "address": "",
    }
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/getuser', {
      username: this.state.username,
    }).then((e) => {
      e.data.map((result) =>{
        return console.log(result);
      })
    })
    this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleInsertSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/insert', {
      user_id: this.state.user_id,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email,
      address: this.state.address,
    }).then((e) => {
      console.log(e);
    })
    this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleUpdateSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/update', {
      user_id: this.state.user_id,
      password: this.state.password,
    }).then((e) => {
      console.log(e);
    })
    this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleDeleteSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/delete', {
      user_id: this.state.user_id,
      password: this.state.password,
    }).then((e) => {
      console.log(e);
    })
      this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleAdvancedQuery1(e) {
    e.preventDefault();
    Axios.get('http://localhost:3002/api/adv1', {
    }).then((e) => {
      console.log(e);
    })
      this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleAdvancedQuery2(e) {
    e.preventDefault();
    Axios.get('http://localhost:3002/api/adv2', {
    }).then((e) => {
      console.log(e);
    })
      this.setState({
      user_id: "",
      username: "",
      password: "",
      email: "",
      address: "",
    });
  }

  handleUserID(e) {
    this.setState({user_id: e.target.value});
  }
  handleUsername(e) {
    this.setState({username: e.target.value});
  }
  handlePassword(e) {
    this.setState({password: e.target.value});
  }
  handleEmail(e) {
    this.setState({email: e.target.value});
  }
  handleAddress(e) {
    this.setState({address: e.target.value});
  }

  render() {
    return (<React.Fragment>
              <h1>Search</h1>
              <div className="userSearch" >
                    <label>Search by username: </label>
                    <input type="text" value={this.state.username} onChange={(e)=>this.handleUsername(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleSearchSubmit(e)}>Submit</button>
              </div>
              <h1>Insert</h1>
              <div className="userInsert" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id} onChange={(e)=>this.handleUserID(e)}/>
                    <label> Username: </label>
                    <input type="text" value={this.state.username} onChange={(e)=>this.handleUsername(e)}/>
                    <label> Password: </label>
                    <input type="text" value={this.state.password} onChange={(e)=>this.handlePassword(e)}/>
                    <label> Email: </label>
                    <input type="text" value={this.state.email} onChange={(e)=>this.handleEmail(e)}/>
                    <label> Address: </label>
                    <input type="text" value={this.state.address} onChange={(e)=>this.handleAddress(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleInsertSubmit(e)}>Submit</button>
              </div>
              <h1>Update</h1>
              <div className="userUpdate" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id} onChange={(e)=>this.handleUserID(e)}/>
                    <label> New Password: </label>
                    <input type="text" value={this.state.password} onChange={(e)=>this.handlePassword(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleUpdateSubmit(e)}>Submit</button>
              </div>
              <h1>Delete</h1>
              <div className="userDelete" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id} onChange={(e)=>this.handleUserID(e)}/>
                    <label> Password: </label>
                    <input type="text" value={this.state.password} onChange={(e)=>this.handlePassword(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleDeleteSubmit(e)}>Submit</button>
              </div>
              <h1>Advanced Queries</h1>
              <div className="userAdvancedQueries" >
                    <button className="submitUser" onClick={(e)=>this.handleAdvancedQuery1(e)}>Advanced Query 1</button>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleAdvancedQuery2(e)}>Advanced Query 2</button>
              </div>
              <MapView/>
              <ListView/>
            </React.Fragment>)
  }
}

