import React from 'react'
import GoogleMapReact from 'google-map-react'
import './map.css'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'


const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" color="#ff6347" width="40" height="40" />
    <p className="pin-text"  style={{color:"#ff6347"}}>{text}</p>
  </div>
)

const Map = ({ location, zoomLevel }) => (
  <div className="map">

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyCXEQ_Jm1T3Ha7dpvHBYbqMXnNaQmCbKn8' }}
        center={location.restaurants[0]}
        defaultZoom={zoomLevel}
      >
      
      
      {location.restaurants.map (item => {  
        return (       
          <LocationPin
            lat={item.lat}
            lng={item.lng}
            text={item.name}
          />
        )}
      )}
        
      </GoogleMapReact>
    </div>
  </div>
)

export default Map

/*
  <LocationPin
    lat={location.lat}
    lng={location.lng}
    text={location.address}
  />
*/