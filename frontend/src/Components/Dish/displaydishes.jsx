import React, { Component } from 'react';
import '../../App.css';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import composeLodash from 'lodash.flowright';
import nachospic from './nachospic.png';
import restro from '../Restaurants/restro.jpg';
import Dish from './dish';
import Navbar from '../Navbar/navbar';
import { getDishesQuery } from '../../_queries/queries';

class Dishes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: [],
      rid: '',
      rdelivery: '',
    };
  }

  async componentDidMount() {
    console.log('props: ', this.props);
    const response = await this.props.client.query({
      query: getDishesQuery,
      variables: { rid: this.props.location.query.rid },
    });
    console.log('response: ', response.data);
    const { status, entity } = response.data.dishes;
    if (status === 200) {
      console.log('here');
      this.setState({
        dishes: [...entity],
        rid: this.props.location.query.rid,
        rdelivery: this.props.location.query.rdelivery,
      });
    }
  }

  render() {
    let addDishes = null;
    if (this.props.isLogged === true && this.props.whoIsLogged === true) {
      addDishes = <Link to='/dishes/add'> <button id="btnLogin" className="btn btn-danger">Add Dishes</button> </Link>
    }

    let warning = null;
    if (this.state.dishes.length === 0) {
      warning = <p className="card-text font-italic">No dishes added by restaurant</p>;
    }

    return (
      <div>
        <Navbar/>
        <div className="container-fluid style={{height: 100}}">
          <div className="row">
            <div className="col-12 mt-3">
              <div className="card">
                <div className="card-horizontal">
                  <img className="img-responsive img-thumbnail" src={restro} style={{ width: 250 }} alt="" width></img>
                  <div className="card-body">
                    <p className="card-text font-weight-bold">{this.props.location.query.rname}</p>
                    <p className="card-text font-italic">Phone: {this.props.location.query.rphone}</p>
                    <p className="card-text font-italic">Address: {this.props.location.query.raddress}</p>
                    <p className="card-text font-italic">Service: {this.props.location.query.rdelivery}</p>
                    {addDishes}
                  </div>
                </div>
                <div className="card-footer">
                  {warning}
                    <p className="card-text">
                      {this.state.dishes.map (dish => (
                        <Dish dish = {dish} rid = {this.state.rid} rdelivery = {this.state.rdelivery} />
                      ))} 
                    </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogged: state.isLogged.isLoggedIn,
    whoIsLogged: state.whoIsLogged.whoIsLoggedIn,
  };
};

export default composeLodash(withApollo, connect(mapStateToProps))(Dishes);
