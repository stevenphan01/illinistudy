import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
  import Search from "./Search";
  import Account from "./Account";
  import Review from "./Review";
  import Map from "./MapView";
  import NavBar from "./NavBar";
  import "./App.css"
  import React from "react";  
class Top extends React.Component {

  constructor(props) {
    super(props)
    this.passingSearch = this.passingSearch.bind(this);
    this.state = {
        status: 0,
        searchQuery: ""
      };    
    }

    passingSearch = (passedSearchQuery) => {
      this.setState({searchQuery: passedSearchQuery})
    }

    signedIn = () => {
      this.setState({status: 1});
    }


    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
            <div className="App">
              <NavBar signedInNav = {this.state.status}></NavBar>
              <Routes>
              <Route path='/search' element={<Search passedSearchQuery = {this.state.searchQuery}/>}/>
              <Route path='/review' element={<Review/>} />
              <Route path='/account' element={<Account signedIn = {this.signedIn}/>} />
              <Route path='/' element={<Map passingSearch = {this.passingSearch}/>} />
              </Routes>
            </div>
          </Router>
        )
    }
}

export default Top;
  