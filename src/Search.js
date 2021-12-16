import React from 'react';
import Axios from 'axios';
import './Search.css';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.goToReview = this.goToReview.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            searchQuery: "",
            searchResults : []
          };
          
    }
 
  search() {
    Axios.post('https://workshop-demo1.uc.r.appspot.com:3002/api/getlocation', {
      query_search: this.state.searchQuery,
    }).then((resultE) => {
        this.setState({searchResults: resultE.data});
    })
  }  

  updateSearchQuery(e) {
    e.preventDefault();
    this.setState({searchQuery: e.target.value});
}

  goToReview(addr, ssid, title) {
    window.location.href = `/review?t=${title}&q=${addr}&ssid=${ssid}`;
  }

  componentDidMount() {
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    this.setState({searchQuery: params.get('q')});
  }

  componentDidUpdate() {
    this.search()
  }

  render() {
    const searchItems = this.state.searchResults.map((user) => 
    <div key={user.ss_id} className = "cardout">
        { /* eslint-disable-next-line */}
        { <div onClick={() => this.goToReview(user.address, user.ss_id, user.name)} className = "location-card"> {user.name + "\n" + "Study Space Id: " + user.ss_id + "\n" + user.address + "\n" + "Hours : " + user.open + "am" +  " - " + user.close + "pm" }</div>}
        </div>);
        return (
            <div className = "study">
                <h3>Search for nearby study spots! Simply enter the address of where you would like to study!</h3>
                <br/>
                <div className="container">
                                <div className="row height d-flex justify-content-center align-items-center">
                                    <div className="col-md-8">
                                           <div className="search"> 
                                            <i className="fa fa-search"></i>
                                            <div className="col">
                                              <input value={this.state.searchQuery} onChange={this.updateSearchQuery} type="text" className="form-control" placeholder="Enter an address, street, zip code..."/>
                                            </div>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                <div >
                    { searchItems }
                </div>
            </div>
        );
  }
}
export default Search;
