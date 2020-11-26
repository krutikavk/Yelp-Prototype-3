import React from 'react';
import {Link} from 'react-router-dom';
import PageNotFound from './404error.jpg';
import Navbar from '../Navbar/navbar';

class NotFoundPage extends React.Component{
  render(){
    return (

      <div>
        <Navbar/>
        <img src={PageNotFound} />
        <p style={{textAlign:"center"}}>
          <Link to="/">Go to Home </Link>
        </p>
      </div>

    )
  }
}
export default NotFoundPage;