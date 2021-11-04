import './Home.css';
import React, {Component} from 'react';
import MapView from './MapView';
import ListView from './ListView';
import Axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleUsername0 = this.handleUsername0.bind(this);
    this.handleUserID1 = this.handleUserID1.bind(this);
    this.handleUsername1 = this.handleUsername1.bind(this);
    this.handlePassword1 = this.handlePassword1.bind(this);
    this.handleEmail1 = this.handleEmail1.bind(this);
    this.handleAddress1 = this.handleAddress1.bind(this);
    this.handleUserID2 = this.handleUserID2.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleUserID3 = this.handleUserID3.bind(this);
    this.handlePassword3 = this.handlePassword3.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    this.handleAdvancedQuery1 = this.handleAdvancedQuery1.bind(this);
    this.handleAdvancedQuery2 = this.handleAdvancedQuery2.bind(this);
    this.state = {
      "username0": "", 
      "user_id1": "",
      "username1": "",
      "password1": "",
      "email1": "",
      "address1": "",
      "user_id2": "",
      "password2": "",
      "user_id3": "",
      "password3": "",
      "displayUsers": [],
      "searchResults": [],
      "advQuery1Results": [],
      "advQuery2Results": [],
    }
  }

  componentDidMount() {
    Axios.post('http://localhost:3002/api/getdata', {
    }).then((resultE) => {
      resultE.data.map((result) =>{
        return this.setState({displayUsers: [...this.state.displayUsers, result]})
      })
    })
    this.setState({searchResults: []});
    this.setState({advQuery1Results: []});
    this.setState({advQuery2Results: []});
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/getuser', {
      username: this.state.username0,
    }).then((resultE) => {
        this.setState({searchResults: resultE.data});
    })
    this.setState({
      username0: "", 
      user_id1: "",
      username1: "",
      password1: "",
      email1: "",
      address1: "",
      user_id2: "",
      password2: "",
      user_id3: "",
      password3: "",
    });
  }

  handleInsertSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/insert', {
      user_id: this.state.user_id1,
      username: this.state.username1,
      password: this.state.password1,
      email: this.state.email1,
      address: this.state.address1,
    }).then((check) => {
      alert("Inserted!");
    })
    Axios.post('http://localhost:3002/api/getdata', {
    }).then((resultE) => {
      this.setState({displayUsers: resultE.data});
    })
    this.setState({
      username0: "", 
      user_id1: "",
      username1: "",
      password1: "",
      email1: "",
      address1: "",
      user_id2: "",
      password2: "",
      user_id3: "",
      password3: "",
    });
  }

  handleUpdateSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/update', {
      user_id: this.state.user_id2,
      password: this.state.password2,
    }).then((check) => {
      alert("Updated!");
    })
    Axios.post('http://localhost:3002/api/getdata', {
    }).then((resultE) => {
      this.setState({displayUsers: resultE.data});
    })
    this.setState({
      username0: "", 
      user_id1: "",
      username1: "",
      password1: "",
      email1: "",
      address1: "",
      user_id2: "",
      password2: "",
      user_id3: "",
      password3: "",
    });
  }

  handleDeleteSubmit(e) {
    e.preventDefault();
    Axios.post('http://localhost:3002/api/delete', {
      user_id: this.state.user_id3,
      password: this.state.password3,
    }).then((check) => {
      alert("Deleted!");
    })
    Axios.post('http://localhost:3002/api/getdata', {
    }).then((resultE) => {
      this.setState({displayUsers: resultE.data});
    })
      this.setState({
        username0: "", 
        user_id1: "",
        username1: "",
        password1: "",
        email1: "",
        address1: "",
        user_id2: "",
        password2: "",
        user_id3: "",
        password3: "",
    });
  }

  handleAdvancedQuery1(e) {
    e.preventDefault();
    Axios.get('http://localhost:3002/api/adv1', {
    }).then((resultE) => {
      this.setState({advQuery1Results: resultE.data});
    })
      this.setState({
        username0: "", 
        user_id1: "",
        username1: "",
        password1: "",
        email1: "",
        address1: "",
        user_id2: "",
        password2: "",
        user_id3: "",
        password3: "",
    });
  }

  handleAdvancedQuery2(e) {
    e.preventDefault();
    Axios.get('http://localhost:3002/api/adv2', {
    }).then((resultE) => {
      this.setState({advQuery2Results: resultE.data});
    })
      this.setState({
        username0: "", 
        user_id1: "",
        username1: "",
        password1: "",
        email1: "",
        address1: "",
        user_id2: "",
        password2: "",
        user_id3: "",
        password3: "",
    });
  }

  handleUsername0(e) {
    this.setState({username0: e.target.value});
  }
  handleUserID1(e) {
    this.setState({user_id1: e.target.value});
  }
  handleUsername1(e) {
    this.setState({username1: e.target.value});
  }
  handlePassword1(e) {
    this.setState({password1: e.target.value});
  }
  handleEmail1(e) {
    this.setState({email1: e.target.value});
  }
  handleAddress1(e) {
    this.setState({address1: e.target.value});
  }
  handleUserID2(e) {
    this.setState({user_id2: e.target.value});
  }
  handlePassword2(e) {
    this.setState({password2: e.target.value});
  }
  handleUserID3(e) {
    this.setState({user_id3: e.target.value});
  }
  handlePassword3(e) {
    this.setState({password3: e.target.value});
  }

  render() {
    const databaseItems = this.state.displayUsers.map((user) => <li key={user.user_id}>{user.user_id + " - " + user.username + " - " + user.password + " - " + user.email + " - " + user.address}</li>);
    const searchItems = this.state.searchResults.map((user) => <li key={user.user_id}>{user.user_id + " - " + user.username + " - " + user.password + " - " + user.email + " - " + user.address}</li>);
    const advQuery1 = this.state.advQuery1Results.map((entry) => <li>{entry.name + " - " + entry.food_avail}</li>);
    const advQuery2 = this.state.advQuery2Results.map((entry) => <li>{entry.course + " - " + entry.curr_cap}</li>);
    return (<React.Fragment>
      <div>
              <div className="row">
                <div className="column">
                <h1>Search Results</h1>
                <div className="searchResults">
                  { searchItems }
                </div>
                </div>
                <div className="column">
                <h1>Realtime Database</h1>
                <div className="searchResults">
                  { databaseItems }
                </div>
                </div>
              </div>
              <h1>Search</h1>
              <div className="userSearch" >
                    <label>Search by username: </label>
                    <input type="text" value={this.state.username0} onChange={(e)=>this.handleUsername0(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleSearchSubmit(e)}>Submit</button>
              </div>
              <h1>Insert</h1>
              <div className="userInsert" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id1} onChange={(e)=>this.handleUserID1(e)}/>
                    <label> Username: </label>
                    <input type="text" value={this.state.username1} onChange={(e)=>this.handleUsername1(e)}/>
                    <label> Password: </label>
                    <input type="text" value={this.state.password1} onChange={(e)=>this.handlePassword1(e)}/>
                    <label> Email: </label>
                    <input type="text" value={this.state.email1} onChange={(e)=>this.handleEmail1(e)}/>
                    <label> Address: </label>
                    <input type="text" value={this.state.address1} onChange={(e)=>this.handleAddress1(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleInsertSubmit(e)}>Submit</button>
              </div>
              <h1>Update</h1>
              <div className="userUpdate" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id2} onChange={(e)=>this.handleUserID2(e)}/>
                    <label> New Password: </label>
                    <input type="text" value={this.state.password2} onChange={(e)=>this.handlePassword2(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleUpdateSubmit(e)}>Submit</button>
              </div>
              <h1>Delete</h1>
              <div className="userDelete" >
                    <label>UserID: </label>
                    <input type="text" value={this.state.user_id3} onChange={(e)=>this.handleUserID3(e)}/>
                    <label> Password: </label>
                    <input type="text" value={this.state.password3} onChange={(e)=>this.handlePassword3(e)}/>
                    <br/>
                    <br/>
                    <button className="submitUser" onClick={(e)=>this.handleDeleteSubmit(e)}>Submit</button>
              </div>
              <div className="row">
                <div className="column">
                <h1>Advanced Query 1</h1>
                <button className="submitUser" onClick={(e)=>this.handleAdvancedQuery1(e)}>Advanced Query 1</button>
                <div className="searchResults">
                  { advQuery1 }
                </div>
                </div>
                <div className="column">
                <h1>Advanced Query 2</h1>
                <button className="submitUser" onClick={(e)=>this.handleAdvancedQuery2(e)}>Advanced Query 2</button>
                <div className="searchResults">
                  { advQuery2 }
                </div>
                </div>
              </div>
              <br></br>
              <br></br>
     </div>
              <MapView/>
              <ListView/>
            </React.Fragment>)
  }
}

