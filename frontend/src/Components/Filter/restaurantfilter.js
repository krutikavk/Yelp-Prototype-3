import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';



class RestFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      method: '',
      methodStates: ['All', 'Curbside pickup', 'Yelp Delivery', 'Dine In'],
      nbrAddress: '',
      nbrLatitude: '',
      nbrLongitude: '',
    }

    this.methodHandler = this.methodHandler.bind(this);

    this.handleSelectAddress = this.handleSelectAddress.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);

  }

  handleAddressChange = (address) => {
    this.setState({
      nbrAddress: address
    })
  }

  methodHandler = (event) => {
    console.log("selected", event.target.value)

    this.setState({
      method: event.target.value
    })

    //The setTimeout is to ensure that React has finished updating the local state 
    //before we update our provider (to ensure we do not get an old state)
    setTimeout(() => {
      this.props.updateFilter(this.state)
    }, 0);
  }

  handleSelectAddress = address => {
    this.setState({nbrAddress : address});
    console.log(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('Location found: ', latLng)

        this.setState({
          nbrLatitude : latLng.lat,
          nbrLongitude : latLng.lng,
        })

        setTimeout(() => {
          this.props.updateFilter(this.state)
        }, 0);

      })
      .catch(error => console.error('Error', error));
  }



  render() {
    return (
      <div>

        <div class="form-inline">
          <label for="ooption" style={{color:"black"}}>Filter by Service: </label>
          <select class="form-control" id="ooption" onChange = {this.methodHandler}>>
            <option value = {this.state.method}> Choose...</option>
            {this.state.methodStates.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          
          <PlacesAutocomplete
          value={this.state.nbrAddress}
          onChange={this.handleAddressChange}
          onSelect={this.handleSelectAddress}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                  placeholder: 'Enter Neighborhood...',
                  className: 'form-control mr-sm-0',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#000000', cursor: 'pointer' }
                      : { backgroundColor: '#D3D3D3', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </div>
      </div>
    )
  }

}

export default RestFilter;
