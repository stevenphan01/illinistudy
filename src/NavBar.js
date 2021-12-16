import './App.css'
import {
    NavLink
  } from "react-router-dom";
import { checkUser, userSignOut } from "./firebase.js";
import React from "react";  


class NavBar extends React.Component {
    constructor(props) {
      super(props);
      this.signIn = this.signIn.bind(this);
      this.signOut = this.signOut.bind(this);
      this.state = {
        status: 0
      }
    }

    signIn = () => {
        this.setState({status: 1});
    }

    signOut = () => {
        this.setState({status: 0});
    }

    componentDidMount() {
        checkUser(this.signIn)
    }

    componentDidUpdate(prevProp, prevState) {
         // eslint-disable-next-line
        if(prevState.status != this.state.status) {
            checkUser(this.signIn);
        }
    }

    render() {
        return (
            <div id="navbar">
            <NavLink activeClassName='active' to='/'>
            <div id="logo">IlliniStudy</div>
            </NavLink>
            <div id="navbar-right">
            <div className="menu-button">
            <NavLink activeClassName='active' to='/account'>
            <div onClick={() => {userSignOut(this.signOut)}} style={{display: `${this.state.status ? 'block' : 'none'}`}} id="signInStatus">
                Sign Out
            </div>
            </NavLink>
            <NavLink activeClassName='active' to='/account'>
            <div>Account</div>
            </NavLink>
            </div>              
            </div>
            </div>
        );
    }
}

export default NavBar;