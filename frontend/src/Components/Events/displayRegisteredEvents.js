import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Navbar from '../Navbar/navbar';
import pumpkin from './mediterranean.jpg';
import Event from './eventcard';



class DisplayRegistered extends Component {

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  componentDidMount() {
    console.log("Mounted registered events")
    axios.defaults.withCredentials = true;


    let url = 'http://localhost:3001/events/customers/' + this.props.cid

    axios.get(url)
    .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("customer IDs", response.data);
          let eidArr = [...response.data]
          let confirmedEvents = []
          let promiseArray = eidArr.map(ev => axios.get('http://localhost:3001/events/'+ ev.eid));
          Promise.all( promiseArray )
          .then( 
            results => {
              let events = results.filter(entry => 
                  entry.status === 200)

              if(events.length > 0) {
                events.forEach(item => {
                  //rest.data[0] will have each restaurant
                  confirmedEvents.push(item.data[0]);
                })

                this.setState ({
                  events: [...confirmedEvents]
                })

                console.log("Events confirmed: ", this.state.events)
              } else {
                alert("No registered events yet")
              }

          })
          .catch(console.log)
        }
      }).catch(err =>{
        alert("Incorrect credentials")
    });
  }

  render() {

    return (
      <div>
        <Navbar/>
        { this.state.events.map (entry => (
               <Event event={entry} />
          ))}
      </div>


    )
  }


}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant

      cid: state.custProfile.cid,
    }
}


export default connect(mapStateToProps)(DisplayRegistered);