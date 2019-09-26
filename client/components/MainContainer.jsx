import React, { Component } from 'react';
import axios from 'axios';
import key from '../../config/keys';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;

    // bind functions
    this.showMoreDetail = this.showMoreDetail.bind(this);
  }

  // initializing the initial state
  get initialState() {
    return {
      fetchingDetails: false,
      photos: [],
      rating: 0,
      price: ''
    };
  }

  // function invoked when the main image is clicked
  showMoreDetail() {
    // get current business detail from yelp api
    axios
      .get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${
          this.props.currentBusiness.yelpid
        }`,
        {
          headers: {
            Authorization: `Bearer ${key.API_KEY}`
          }
        }
      )
      .then(({ data }) => {
        // console.log('IN SHOW MORE DETAIL DATA: ', data);
        // store the information to the state
        this.setState({
          fetchingDetails: true,
          // only three photos are passed from the data
          photos: data.photos.slice(),
          rating: data.rating,
          review_count: data.review_count,
          price: data.price
        });
      })
      .catch(err =>
        console.log(
          `App.showMoreDetail: get businesses details from yelp: Error: ${err}`
        )
      );
  }

  // reset the state when next or addFav is clicked
  resetState() {
    this.setState(this.initialState);
  }

  render() {
    // destructuring props
    const { currentBusiness, addFav, moveNext } = this.props;

    // when the image is clicked show details
    if (this.state.fetchingDetails) {
      return (
        <main>
          <div className='modal details'>
            <div>
              <img src={this.state.photos[0]} />
              <img src={this.state.photos[1]} />
              <img src={this.state.photos[2]} />
            </div>
            <div className='details-content'>
              <h3>{currentBusiness.name}</h3>
              <p>Address: {currentBusiness.address}</p>
              <p>Rating: {this.state.rating}</p>
              <p>{this.state.review_count} reviews</p>
              <p>Price: {this.state.price}</p>
            </div>
            <div className='button-group'>
              <button
                className='fav'
                onClick={() => {
                  addFav();
                  this.resetState();
                }}
              >
                <i className='fa fa-heart'></i>
              </button>
              <button
                className='next'
                onClick={() => {
                  moveNext();
                  this.resetState();
                }}
              >
                <i className='fa fa-times'></i>
              </button>
              <a
                className='yelp'
                href={currentBusiness.yelpurl}
                target='_blank'
              >
                <i className='fa fa-info'></i>
              </a>
            </div>
          </div>
        </main>
      );
    }

    // when image is not clicked, only show the main image and two buttons
    return (
      <main>
        <div className='modal'>
          <img
            className='img-main'
            src={currentBusiness.imgurl}
            onClick={() => this.showMoreDetail()}
          />
          <div className='button-group'>
            <button
              className='fav'
              onClick={() => {
                addFav();
              }}
            >
              <i className='fa fa-heart'></i>
            </button>
            <button
              className='next'
              onClick={() => {
                moveNext();
              }}
            >
              <i className='fa fa-times'></i>
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default MainContainer;
