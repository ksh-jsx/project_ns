import React from 'react';
import { geolocated } from "react-geolocated";
class Geoloc extends React.Component {  
  render() {
    return !this.props.isGeolocationAvailable
      ? <div>Your browser does not support Geolocation</div>
      : !this.props.isGeolocationEnabled
        ? <div>Geolocation is not enabled</div>
        : this.props.coords
          ? <div style={{display:'none'}}>
                <div id="lat">{this.props.coords.latitude}</div>
                <div id="lng">{this.props.coords.longitude}</div>
            </div>
          : <div>Getting the location data&hellip; </div>;
  }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(Geoloc);
