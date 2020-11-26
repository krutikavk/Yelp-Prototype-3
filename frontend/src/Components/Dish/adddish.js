import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import Navbar from '../Navbar/navbar';



class AddDish extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dname: '',
      dingredients: '',
      dprice: '',
      ddescription: '',
      dcategory: '',
      added: false,

      //For uploading image
      url: '',
      success: false,
    }

    this.dnameChangeHandler = this.dnameChangeHandler.bind(this);
    this.dingredientsChangeHandler = this.dingredientsChangeHandler.bind(this);
    this.dpriceChangeHandler = this.dpriceChangeHandler.bind(this);
    this.ddescriptionChangeHandler = this.ddescriptionChangeHandler.bind(this);
    this.dcategoryChangeHandler = this.dcategoryChangeHandler.bind(this);
    this.addDish = this.addDish.bind(this);
  }

  dnameChangeHandler = (event) => {
    this.setState ({
      dname: event.target.value
    })
  }

  dingredientsChangeHandler = (event) => {
    this.setState ({
      dingredients: event.target.value
    })
  }

  dpriceChangeHandler = (event) => {
    this.setState ({
      dprice: event.target.value
    })
  }

  ddescriptionChangeHandler =  (event) => {
    this.setState ({
      ddescription: event.target.value
    })
  }

  dcategoryChangeHandler = (event)  => {
    this.setState ({
      dcategory: event.target.value
    })
  }

  handleFileChange = (event) => {
    this.setState({
      success: false, url : ''
    });
  }

  // Perform the upload
  handleFileUpload = (event) => {
    this.setState({
      success: false, 
      url : ''
    });

    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = 'custprof_' + fileParts[0];
    console.log(fileName);
    let fileType = fileParts[1];
    console.log("Preparing the upload");

    axios.defaults.withCredentials = false;

    axios.post("http://localhost:3001/sign_s3",{ fileName : fileName, fileType : fileType })
      .then(response => {
        var returnData = response.data.data.returnData;
        var signedRequest = returnData.signedRequest;
        var url = returnData.url;

        this.setState({url: url})
        this.setState({success: true})
        console.log("Recieved a signed request " + signedRequest);
        // Put the fileType in the headers for the upload
        var options = {
          headers: {
            'ContentType': fileType
          }
        };

        axios.put(signedRequest,file, options)
          .then(result => {
            console.log("Response from s3")
            this.setState({
              success: true
            });

          })
          .catch(error => {
            alert("ERROR " + JSON.stringify(error));
          })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })

  }


  addDish = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    let url = 'http://localhost:3001/dishes'

    const data = {
      dname: this.state.dname,
      rid: this.props.rid,
      dingredients: this.state.dingredients,
      dprice: this.state.dprice,
      ddescription: this.state.ddescription,
      dcategory: this.state.dcategory,
      durl: this.state.url
    }


    axios.post(url, data)
      .then(response => {
        console.log("Status Code : ",response.status);
        if(response.status === 200){
          console.log("Dish added ")
          
          this.setState({
              added : true
          })
        }
      }).catch(err =>{
        alert("Incorrect credentials")
    });

  }


  render(){

    let redirectVar = null;

    if(! (this.props.isLogged !== true && this.props.whoIsLogged !== true)) {
      //redirectVar = <Redirect to='/login'/>
    }
    if(this.state.added === true) {
      redirectVar = <Redirect to='/restaurant'/>
    }

    const Success_message = () => (
      <div class='form-group'>
      <img src={this.state.url} alt="" class="img-responsive" width="40" height="40"/>
      <br/>
      </div>
    )

    return (

      <div>
        <Navbar/>
        <div>
          {redirectVar} 
          <div className="card col-12 col-lg-4 login-card mt-2 hv-center" >

            <br/>
            <form>
              <div className="col d-flex justify-content-center rounded-0">
                <div className="card-header">
                  <h4>New Dish: </h4>
                </div>
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Dish Name</label>
                <input onChange = {this.dnameChangeHandler} 
                                    type="text"  
                                    name="dname" 
                                    className="form-control form-control-sm"
                                    placeholder="Dish Name"
                                    aria-describedby="emailHelp" 
                                    required/>
              </div>

              <div className = "form-group text-left">
                <br/>
                <label htmlFor="exampleInputEmail1">Dish Ingredients</label>
                <input onChange = {this.dingredientsChangeHandler} 
                                    type="text"  
                                    name="dingredients" 
                                    className="form-control form-control-sm"
                                    placeholder="Ingredients"
                                    aria-describedby="emailHelp" 
                                    />
              </div>
              <div className="form-group text-left">
                <br/>
                <label htmlFor="exampleInputPassword1">Dish Description</label>
                <input onChange = {this.ddescriptionChangeHandler} 
                                    type="text" 
                                    name="ddescription" 
                                    className="form-control form-control-sm"
                                    placeholder="Description" 
                                    rows="5"
                                    required/>
                                    
              </div>
              <div className="form-group text-left">
                <br/>
                <label htmlFor="exampleInputPassword1">Dish Price</label>
                <input onChange = {this.dpriceChangeHandler} 
                                    type="number" 
                                    name="dprice" 
                                    className="form-control form-control-sm"
                                    placeholder="Price"
                                    step="0.01"
                                    required/>
                                    
              </div>

              <div class="form-group">
                
                
                <label htmlFor="exampleInputPassword1">Dish Photo</label> <br/>
                {Success_message}
                <input onChange={this.handleFileUpload} ref = {(ref) => {this.uploadInput = ref;}} type = "file"/>
              </div>

              <div className="col-md-12 text-center">
              <button id="btnLogin" className="btn btn-danger" onClick={this.addDish}>Add Dish</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    )


  }

}


const mapStateToProps = (state) => {
    return {

      //Get global state to get cid, rid and login details to fetch dishes for customer/restaurant
      rid: state.restProfile.rid,
      isLogged: state.isLogged.isLoggedIn,
      whoIsLogged: state.whoIsLogged.whoIsLoggedIn,

    }
}


export default connect(mapStateToProps)(AddDish);