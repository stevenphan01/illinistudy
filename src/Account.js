import React from 'react';
import "./Account.css"
import { createUser, signIn } from "./firebase.js";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.state = {
      password: "",
      email: "",
      signInEmail: "",
      signInPassword: "",
    }
  }

  handlePassword(e) {
    this.setState({password: e.target.value});
  }
  handleEmail(e) {
    this.setState({email: e.target.value});
  }

  handlePassword1(e) {
    this.setState({signInPassword: e.target.value});
  }
  handleEmail1(e) {
    this.setState({signInEmail: e.target.value});
  }

  render() {
        return (
          <div>
          <h1>Sign into a user account to post reviews!</h1>
           <h2>Sign In</h2>
              <div className="userInsert" >
                    <label className="labelText"> Email:  </label>
                    <input className="search-bar-input" type="text" value={this.state.signInEmail} onChange={(e)=>this.handleEmail1(e)}/>
                    <br></br>
                    <br></br>
                    <label className="labelText"> Password:  </label>
                    <input className="search-bar-input" type="password" value={this.state.signInPassword} onChange={(e)=>this.handlePassword1(e)}/>
                    <br></br>
                    <br></br>
                    <button className="btn btn-primary" onClick={() => signIn(this.props.signedIn, this.state.signInEmail, this.state.signInPassword)}>Submit</button>
              </div>
              <br></br>
              <br></br>
          <h2>Create New User Account</h2>
              <div className="userInsert" >
                    <label className="labelText"> Email:  </label>
                    <input className="search-bar-input" type="text" value={this.state.email} onChange={(e)=>this.handleEmail(e)}/>
                    <br></br>
                    <br></br>
                    <label className="labelText"> Password:  </label>
                    <input className="search-bar-input" type="password" value={this.state.password} onChange={(e)=>this.handlePassword(e)}/>
                    <br></br>
                    <br></br>
                    <button className="btn btn-primary" onClick={() => createUser(this.state.email, this.state.password)}>Submit</button>
              </div>
              <br></br>
              <br></br>
            </div>
        );
  }
}
export default Account;
