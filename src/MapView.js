import React, {Component} from 'react';
import "./MapView.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Link
  } from "react-router-dom";
export default class MapView extends Component {

    constructor(props) {
        super(props)
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.isEnterPressed = this.isEnterPressed.bind(this);
        this.clickedSearch = this.clickedSearch.bind(this);
        this.state = {
             searchQuery : '',
        };
    }

    updateSearchQuery(e) {
        e.preventDefault();
        this.setState({searchQuery: e.target.value});
    }

    clickedSearch() {
        const { href } = window.location;
        window.location.href = `${href}search?q=${this.state.searchQuery}`;
    }

    isEnterPressed(e) {
        if(e.key === 'Enter') {
            const { href } = window.location;
            window.location.href = `${href}search?q=${this.state.searchQuery}`;
        }
    }

    render() {
        return (<React.Fragment>
                <div className='search-card'>
                    <section className="search-section">
                        <div>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <h1 className="intro-text">Best places to study on campus!</h1>
                            <br/>
                            <br/>
                            <div className="container">
                                <div className="row height d-flex justify-content-center align-items-center">
                                    <div className="col-md-8">
                                           <div className="search"> 
                                            <i className="fa fa-search"></i>
                                            <input value={this.state.searchQuery} onChange={this.updateSearchQuery} type="text" className="form-control" placeholder="Enter an address, street, zip code..." onKeyPress={this.isEnterPressed}/> <br/>
                                            <Link className="btn btn-primary" to={{pathname: "/search"}} onClick={this.clickedSearch}>Search</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                    </section>
                    <section className="top-section">
                        <h1 className="top-text">Top Study Spots</h1>
                        <div className="row">
                            <div className="col">
                                <div className="card">  
                                    { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://www.library.illinois.edu/wp-content/uploads/2017/12/grainger23_small.jpg" width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Grainger Engineering Library</h5>
                                        <a href="/review?t=Grainger%20Engineering%20Library%20Information%20Center&q=1301%20Springfield%20Ave%20Urbana,%20IL%2061801&ssid=224" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">  
                                { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://cdnassets.hw.net/48/92/f6d4193f49969993f7b8c6ee94d3/2017-09-14-uiuc-electrical-and-computer-engineering-bldg-2.jpg" width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">ECE Building</h5>
                                        <a href="/review?t=Electrical%20and%20Computer%20Engineering%20Building&q=306%20N%20Wright%20St%20Urbana,%20IL%2061801&ssid=278" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">  
                                { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://dreuarchive.cra.org/2019/Ren/images/siebel.jpg" width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Siebel Center</h5>
                                        <a href="/review?t=Siebel%20Center%20for%20Design&q=1208%20S%20Fourth%20St%20Champaign,%20IL%2061820&ssid=888" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <div className="card">  
                                { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://aces.illinois.edu/sites/aces.illinois.edu/files/news/ACES%20library.jpg  " width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">ACES Library</h5>
                                        <a href="/review?t=ACES%20Library,%20Information,%20and%20Alumni%20Center&q=1101%20S%20Goodwin%20Ave%20Urbana,%20IL%2061801&ssid=258" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">  
                                { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://beckman.illinois.edu/images/default-source/beckman-building-images/beckmansummer.jpg?sfvrsn=c20581a4_4" width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Beckman Institute</h5>
                                        <a href="/review?t=Arnold%20O.%20and%20Mabel%20M.%20Beckman%20Institute%20for%20Advanced%20Science%20and%20Technology&q=405%20N%20Mathews%20Ave%20Urbana,%20IL%2061801&ssid=167" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">  
                                { /* eslint-disable-next-line */}
                                    <img class="card-img-top" src="https://las.illinois.edu/sites/default/files/news/storyimages/24740.png" width="200" height="200"></img>
                                    <div className="card-body">
                                        <h5 className="card-title">Natural History Library</h5>
                                        <a href="/review?t=Natural%20History%20Building&q=1301%20W%20Green%20St%20Urbana,%20IL%2061801&ssid=26" class="btn btn-primary">Reviews</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                </React.Fragment>)
    }
}

