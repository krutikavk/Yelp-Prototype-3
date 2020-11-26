import * as React from 'react';
import axios from 'axios';
import {update, login, logout} from '../_actions';
import {connect} from 'react-redux';

const DefaultState = {
  orderListings: [],
  filter: {}
}

const OrderListingsContext = React.createContext(DefaultState)

export class OrderListingsProvider extends React.Component {
  
  constructor(props){
    super(props)
    this.state = DefaultState

  }

  componentWillMount() {
    //change this to axios call
    let url = 'http://localhost:3001/orders/';

    //Type: 'customers' or 'restaurants' 
    //id: cid or rid
    url += this.props.type + '/' + this.props.id
    console.log("props", this.props)

    //let url = 'http://localhost:3001/orders/restaurants/' + id
    console.log("URL", url);

    //axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.get(url)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          this.setState({ 
            orderListings: response.data 
          })
          console.log("orderlistings", this.state.orderListings)
          let oid = response.data.oid

        }
      }).catch(err =>{
        //alert("Error fetching orders")
        console.log("Error fetching orders")
    });
  }

  updateFilter = filter => {
    this.setState({
      filter: filter
    })
  }


  static applyFilter(orders, filter) {
    const displayOrder = filter
    let result = orders
    // console.log("filter", filter);
    // console.log("displayorder", displayOrder);
    // console.log("orders:" , orders)
    // console.log("displayorder: ", displayOrder)
    console.log("Inside apply filter")
    console.log("orders", orders)
    
    if (displayOrder && displayOrder.ooption && displayOrder.ooption !== 'All') {
       result = result.filter(item => item.ooption === displayOrder.ooption)
    }

    if (displayOrder && displayOrder.ostatus && displayOrder.ostatus !== 'All') {
       result = result.filter(item => item.ostatus === displayOrder.ostatus)
    } 

    if (displayOrder && displayOrder.otype && displayOrder.otype !== 'All') {
       result = result.filter(item => item.otype === displayOrder.otype)
    }
    
    console.log(result)
    return result;
    
  }





  render() {
    let {children} = this.props
    console.log("children: ", this.props)
    const { orderListings, filter } = this.state
    console.log("updateFilter: ", filter)
    let filteredListings = OrderListingsProvider.applyFilter(orderListings, filter)
    return (
      <OrderListingsContext.Provider
        value={{
          orderListings: filteredListings,
          updateFilter: this.updateFilter
        }}
      >
      {children}
      </OrderListingsContext.Provider>
    )
  }
}


//export default connect(mapStateToProps, mapDispatchToProps)(OrderListingsProvider);

export const OrderListingsConsumer = OrderListingsContext.Consumer