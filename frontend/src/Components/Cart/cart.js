import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {update, updateCart, login, logout, customerLogin} from '../../_actions';
import Navbar from '../Navbar/navbar';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { addOrderMutation, addOrderDishMutation } from '../../_mutations/mutations';

class Cart extends Component{

  constructor(props) {
    super(props);

    this.state = {
      ordered: false,
      orderdetail: false,
      orderdish: false,
      placed: false,
      ooption: '',
      ooptionStates: ['Pickup', 'Delivery'],
    };

    this.removeEntryHandler = this.removeEntryHandler.bind(this);
    this.placeOrderHandler = this.placeOrderHandler.bind(this);

    this.ooptionHandler = this.ooptionHandler.bind(this);

  }

  removeEntryHandler = (event) => {
    console.log("remove ID", event.target.value)
    this.props.updateCart('DELETE', {did: event.target.value})
  }

  ooptionHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      ooption: event.target.value
    })
  }


  placeOrderHandler = (event) => {
    event.preventDefault();
    let orderdata = {
      cid: this.props.cid, 
      rid: this.props.cartContents[0].rid, 
      ooption: this.state.ooption, 
      ostatus: 1, 
      otype: 1,
      oaddress: '', 
    }

    var oid = -1;
    //array this.props.cartContents has dname and dquantity

    let orderdish = {
      oid: '',
      did: '',
      dname: '',
      dquantity: '',
    }

    const { addOrderMutation, addOrderDishMutation } = this.props;
    addOrderMutation({
      variables: {
        cid : this.state.email,
        rid: this.props.cartContents[0].rid, 
        ooption: this.state.ooption, 
      },
      // refetchQueries: [{ query: getCustomerQuery() }]
    }).then(response => {
      const { status, entity } = response.data.addOrder;
      if(status == 200){
        let oid = entity.id;
        let data = [];
        this.props.cartContents.forEach(dish => {
          console.log("Dish name: ", dish.dname)
          console.log("Dish quantity: ", dish.dquantity)
          let temp = {
            oid: oid,
            did: dish.did,
            dname: dish.dname,
            dquantity: dish.dquantity
          } 
          data.push(temp)
          console.log('data', data)
        });

        let promiseArray = data.map(item => {
          addOrderDishMutation({
            variables: {
              oid: item.oid,
              did: item.did,
              dname: item.dname,
              dquantity: item.dquantity,
            },
          })
        });
        Promise.all( promiseArray )
        .then(
          results => {
            /*
            console.log('results: ', results)
            let err = results.data.addOrderDish.filter(entry => 
              entry.status !== 200
            )
            if(err.length === 0) {
              this.props.updateCart('ORDER');
              this.setState({
                placed: true
              })
              console.log("Order placed")
              alert("Order Placed")
            }
            */
            this.setState({
                placed: true
              })
            console.log("Order placed")
            alert("Order Placed")
          }
        )
        .catch(console.log)

      } else {
        alert('Error Placing order');
      }
    });

    /*
    axios.post('http://localhost:3001/orders', orderdata)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("Order entered in table: ")
          console.log("order id: ", response.data);
          //call props action
          oid = response.data[0]['MAX(oid)'];
          console.log("Order id received: ", oid);

          let data = [];
          this.props.cartContents.forEach(dish => {
            console.log("Dish name: ", dish.dname)
            console.log("Dish quantity: ", dish.dquantity)
            let temp = {
              oid: oid,
              did: dish.did,
              dname: dish.dname,
              odquantity: dish.dquantity
            }

            data.push(temp)

          });
          console.log(data);

          //For each array entry as data, have to place an axios request
          //Axios is asynchronous so have to use promise all to gather all responses and then process them
          //Reference: https://stackoverflow.com/questions/44402079/how-to-make-multiple-axios-requests-using-a-dynamic-array-of-links-in-javascript/44403848 
          let promiseArray = data.map(dataarr => axios.post('http://localhost:3001/orders/dishes', dataarr));
          Promise.all( promiseArray )
          .then(
            results => {
              let err = results.filter(entry => 
                entry.status !== 200
              )

              if(err.length === 0) {
                this.props.updateCart('ORDER');
                this.setState({
                  placed: true
                })
                console.log("Order placed")
                alert("Order Placed")

              }
            }
          )
          .catch(console.log)
        }
      }).catch(err =>{
        alert("Incorrect credentials")
        this.setState({
            authFlag : false
        })
    });
    */
  }


  render() {
    let redirectVar = null;
    //Only customer login can access the cart--not needed anymore
    //navbar renders cart only for customer login
    if(! (this.props.isLogged === true  && this.props.whoIsLogged === false)) {
      //redirectVar = <Redirect to='/restaurants'/>
    }
    //{this.props.cartContents[0].cartid}


    let subTotal = 0;
    this.props.cartContents.map(item=> (
      subTotal += item.dprice * item.dquantity
    ))

    if(this.state.placed === true) {
      redirectVar = <Redirect to='/orders'/>
    }

    let total = subTotal + 5;

    return (


      <div>
        {redirectVar}
        <Navbar/>
        <div class="pb-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" class="border-0 bg-light">
                            <div class="p-2 px-3 text-uppercase">Product</div>
                          </th>
                          <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Rate</div>
                          </th>
                          <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" class="border-0 bg-light">
                            <div class="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>


                        {this.props.cartContents.map (entry => (
                          <tr>
                            <th scope="row" class="border-0">
                              <div class="p-2">
                                <img src="https://res.cloudinary.com/mhmd/image/upload/v1556670479/product-1_zrifhn.jpg" alt="" width="70" class="img-fluid rounded shadow-sm"></img>
                                <div class="ml-3 d-inline-block align-middle">
                                  <h5 class="mb-0"> <a href="#" class="text-dark d-inline-block align-middle">{entry.dname}</a></h5><span class="text-muted font-weight-normal font-italic d-block">Restaurant: {entry.rid}</span>
                                </div>
                              </div>
                            </th>
                            <td class="border-0 align-middle"><strong>{entry.dprice}</strong></td>
                            <td class="border-0 align-middle"><strong>{entry.dquantity}</strong></td>
                            <td class="border-0 align-middle"><strong>{entry.dquantity * entry.dprice}</strong></td>
                            <td class="border-0 align-middle"><button onClick={this.removeEntryHandler} value = {entry.did} class="btn btn-primary">Remove</button></td>
                          </tr>
                        ))}


                      </tbody>
                    </table>

                     
                    <div class="form-group">
                      <label for="otype">Select Service option: </label>
                      <select class="form-control" id="ooption" onChange = {this.ooptionHandler}>>
                        <option value = {this.state.otype}> Choose...</option>
                        {this.state.ooptionStates.map(option => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

              </div>
            </div>

            <div class="row py-5 p-4 bg-white rounded shadow-sm">
              <div class="col-lg-6">
                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                <div class="p-4">
                  <p class="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                  <div class="input-group mb-4 border rounded-pill p-2">
                    <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" class="form-control border-0"></input>
                    <div class="input-group-append border-0">
                      <button id="button-addon3" type="button" class="btn btn-dark px-4 rounded-pill"><i class="fa fa-gift mr-2"></i>Apply coupon</button>
                    </div>
                  </div>
                </div>
                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for Restaurant</div>
                <div class="p-4">
                  <p class="font-italic mb-4">If you have specific instructions for your order, let us know here.</p>
                  <textarea name="" cols="30" rows="2" class="form-control"></textarea>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div class="p-4">
                  <p class="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                  <ul class="list-unstyled mb-4">
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Order Subtotal </strong><strong>${subTotal}</strong></li>
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Delivery Charge</strong><strong>$5</strong></li>
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Tax</strong><strong>$0.00</strong></li>
                    <li class="d-flex justify-content-between py-3 border-bottom"><strong class="text-muted">Total</strong>
                      <h5 class="font-weight-bold">${total}</h5>
                    </li>
                  </ul><a href="#" onClick= {this.placeOrderHandler} class="btn btn-dark rounded-pill py-2 btn-block">Place Order</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    )
  }

}



const mapStateToProps = (state) => {
    return {
      cid: state.custProfile.cid,
      cartContents: state.cart.cartContents,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}

//const mapDispatchToProps = (dispatch) => { since this does not call a function directly it cannot be a function

function mapDispatchToProps(dispatch) {  
  return {
    update : (field, payload) => dispatch(update(field, payload)),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    customerLogin: () => dispatch(customerLogin()),
    updateCart: (field, payload) => dispatch(updateCart(field, payload))
  }
  
}

export default compose(graphql(addOrderMutation, { name: 'addOrderMutation' }), graphql(addOrderDishMutation, { name: 'addOrderDishMutation' }), connect(mapStateToProps, mapDispatchToProps))(Cart);
