import React, { Component } from 'react';


class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ooption: '',
      ooptionStates: ['All', 'Pickup', 'Delivery'],
      ostatus: '',
      ostatusStates: ['All', 'Order received', 'Preparing', 'Pickup ready','Picked up', 'On the way', 'Delivered'],
      otype: '',
      otypeStates: ['All', 'New', 'Picked up', 'Delivered', 'Cancelled']
    }

    this.ooptionHandler = this.ooptionHandler.bind(this);
    this.ostatusHandler = this.ostatusHandler.bind(this);
    this.otypeHandler = this.otypeHandler.bind(this);
  }

  ooptionHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      ooption: event.target.value
    })

    //The setTimeout is to ensure that React has finished updating the local state 
    //before we update our provider (to ensure we do not get an old state)
    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
  }


  ostatusHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      ostatus: event.target.value
    })
    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
  }


  otypeHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      otype: event.target.value
    })
    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
  }

  /*

    <div class="form-group">
          <label for="ostatus">Ostatus: </label>
          <select class="form-control" id="ostatus">
            <option>Pickup</option>
            <option>Order received</option>
            <option>Preparing</option>
            <option>Pickup ready</option>
            <option>Picked up</option>
            <option>On the way</option>
            <option>Delivered</option>
          </select>
        </div>

        <div class="form-group">
          <label for="otype">Otype: </label>
          <select class="form-control" id="otype">
            <option>New</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

  */
  render() {
    return (
      <div>

        <div class="form-group">
          <label for="ooption">Filter by Service: </label>
          <select class="form-control" id="ooption" onChange = {this.ooptionHandler}>>
            <option value = {this.state.ooption}> Choose...</option>
            {this.state.ooptionStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div class="form-group">
          <label for="ostatus">Filter by Order Status: </label>
          <select class="form-control" id="ooption" onChange = {this.ostatusHandler}>>
            <option value = {this.state.ostatus}> Choose...</option>
            {this.state.ostatusStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div class="form-group">
          <label for="otype">Filter by Order Type: </label>
          <select class="form-control" id="ooption" onChange = {this.otypeHandler}>>
            <option value = {this.state.otype}> Choose...</option>
            {this.state.otypeStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

      </div>
    )
  }
}

export default Filter;