import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { Icon, InlineIcon } from '@iconify/react';
import starIcon from '@iconify/icons-typcn/star';

class Review extends Component {

  constructor(props) {
    super(props);

    this.state = {
      linkReviewTo: {}
    }
  }

  componentDidMount() {

    let url = '';
    console.log("review component mounted")
    if(this.props.whoIsLogged === true) {
      //for restaurant login, link review to customer
      url = 'http://localhost:3001/customers/' + this.props.review.cid
    } else {
      //for customer login, link review to restaurant
      url = 'http://localhost:3001/restaurants/' + this.props.review.rid
    }
    axios.get(url)
        .then(response => {
          if(response.status === 200){
            //When results return multiple rows, rowdatapacket object needs to be converted to JSON object again 
            //use JSON.parse(JSON.stringify()) to convert back to JSON object
            let temp = JSON.parse(JSON.stringify(response.data));
            this.setState({
              //Expecting just one row of result, so return row 0!! 
              //Do not =[...temp] or temp
              linkReviewTo: temp[0],
            })
          }
        }).catch(err =>{
            console.log("No response")
    });

    
  }

  render() {


    let linkto = '';
    let query = this.state.linkReviewTo;
    let name = ''
    
    console.log(this.props.whoIsLogged)

    if(this.props.whoIsLogged === false) {
      //customer login--link to restaurant
      linkto = '/restaurant'; 
      console.log("here")  
      console.log("query data: ", query) 
      name = this.state.linkReviewTo.rname
    } else {
      linkto = '/customer/profile';
      console.log("there")
      name = this.state.linkReviewTo.cname
    }

    return (

      
        <div class="container-fluid style={{height: 100}}">
            <div class="row">
              <div class="col-12 mt-3">
                <div class="card">
                  <div class="card-horizontal">
                    <div class="card-body">
                      <Link to ={{
                          pathname: linkto , query: query
                        }}>
                        <p class="card-text font-weight-bold">{name}</p>
                      </Link>
                      <p class="card-text font-weight-bold font-italic"> 
                        <Icon icon={starIcon} color="red" width="30" height="30" />
                        {this.props.review.rerating}/5
                      </p>
                      <small class="text-muted">Reviewed: {this.props.review.rdate.split("T")[0]}</small>
                    </div>
                  </div>
                  <div class="card-footer">
                    <p class="card-text font-italic">{this.props.review.retext}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

      /*
      <Link to ={{
                  pathname: linkto , query: query
                }}>
        <div class="card-horizontal" >
          <div class="card-body">
            <h4 class="card-title">{name} </h4>
            <small class="text-muted">{this.props.review.rerating}</small>
            <p class="card-text">{this.props.review.retext}</p>
            <p class="card-text">Category: {this.props.review.rdate}</p>
          </div>
        </div>
      </Link>
      */
    )
  }

}

const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

export default connect(mapStateToProps)(Review);