import React from 'react';
import Axios from 'axios';
import { checkUser } from "./firebase.js";
import "./Review.css"

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.updateq = this.updateq.bind(this);
    this.updatec = this.updatec.bind(this);
    this.updatep = this.updatep.bind(this);
    this.updatew = this.updatew.bind(this);
    this.updatef = this.updatef.bind(this);
    this.updateco = this.updateco.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.ReviewsignIn = this.ReviewsignIn.bind(this);
    this.state = {
      status: 0,
      title: "",
      addr: "",
      ssid: "",
      flag: 0,
      q: 5,
      c: 5,
      p: 5,
      w: 5,
      f: 5,
      co: 5,
      reviewResults: [],
    }
  }

  ReviewsignIn = () => {
    this.setState({status: 1});
  }

  submitReview() {
    Axios.post('https://workshop-demo1.uc.r.appspot.com/api/insertReview', {
      study_spot: this.state.ssid,
      quietness: this.state.q,
      collab: this.state.c,
      private_rooms: this.state.p,
      whiteboards: this.state.w,
      food: this.state.f,
      computers: this.state.co}).then(() => {
        alert("Submitted");
    })
  }

  updateq(event) {
    this.setState({q: event.target.value});
  }

  updatec(event) {
    this.setState({c: event.target.value});
  }

  updatep(event) {
    this.setState({p: event.target.value});
  }

  updatew(event) {
    this.setState({w: event.target.value});
  }

  updatef(event) {
    this.setState({f: event.target.value});
  }

  updateco(event) {
    this.setState({co: event.target.value});
  }

  componentDidMount() {
    checkUser(this.ReviewsignIn)
    const windowUrl = window.location.search;
    const params = new URLSearchParams(windowUrl);
    this.setState({title: params.get('t')});
    this.setState({addr: params.get('q')});
    this.setState({ssid: params.get('ssid')});
    this.setState({flag: 0});
  }

   // eslint-disable-next-line
  componentDidUpdate(prevProps, prevState) {
     // eslint-disable-next-line
    if(prevState.status != this.state.status) {
      checkUser(this.ReviewsignIn); }
       // eslint-disable-next-line
    if(this.state.flag == 0) {
      this.setState({flag: 1});
      Axios.post('https://workshop-demo1.uc.r.appspot.com/api/getreviews', {
        ssid: this.state.ssid,
      }).then((resultE) => {
          this.setState({reviewResults: resultE.data});
      })
    }
  }

  render() {
    const reviewItems = this.state.reviewResults.map((review) => 
    <div key={review.review_id}>
        { <div className="review-items"> 
        <div> {"Average Quietness: " + review.avgQuietness}</div>
        <div> {"Average Collaboration: " + review.avgCollab}</div>
        <div> {"Average Private Rooms: " + review.avgPrivateRooms}</div>
        <div> {"Average Whiteboards: " + review.avgWhiteboards}</div>
        <div> {"Average Food Availibilty: " + review.avgFood}</div>
        <div> {"Average Computer: " + review.avgComputers}</div>
        </div>}
    </div>);
    const addrURL = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=" + encodeURIComponent(this.state.addr) + "+(Study%20Spot)&t=&z=14&ie=UTF8&iwloc=B&output=embed";
    return (
      <div>
      <div className="map-wrapper">
            <iframe width="100%" height="100%" src={addrURL} title="mymap"></iframe>
      </div>
      <div className="review-wrapper">
      <div className="review-title">{this.state.title}</div>
      <br/>
      <div className="review-subheading">Reviews: </div>
      <br/>
      <br/>
      <div>
        { reviewItems }
      </div>
      <div style={{display: `${this.state.status ? 'flex' : 'none'}`}} className="slider-rows">
          <div className="review-row"><div className="review-col">Quietness: </div><input onChange={this.updateq} value={this.state.q} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.q}</div></div>
          <div className="review-row"><div className="review-col">Collaboration: </div><input onChange={this.updatec} value={this.state.c} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.c}</div></div>
          <div className="review-row"><div className="review-col">Private Rooms: </div><input onChange={this.updatep} value={this.state.p} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.p}</div></div>
          <div className="review-row"><div className="review-col">Whiteboards: </div><input onChange={this.updatew} value={this.state.w} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.w}</div></div>
          <div className="review-row"><div className="review-col">Food: </div><input onChange={this.updatef} value={this.state.f} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.f}</div></div>
          <div className="review-row"><div className="review-col">Computer: </div><input onChange={this.updateco} value={this.state.co} className="review-col" type="range" min="0" max="5"></input><div className="review-col">{this.state.co}</div></div>
        </div>
        <button style={{display: `${this.state.status ? 'inline-block' : 'none'}`}} onClick={() => {this.submitReview()}} className="btn btn-primary">Submit Review</button>
      </div>
      </div>
        );
  }
}
export default Review;
