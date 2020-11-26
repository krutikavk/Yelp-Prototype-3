const initialRestProfile = {
  rid: '',
  remail: '',
  rpassword: '',
  rname: '',
  rphone: '',
  rabout: '',
  rphoto: '',
  rlocation: '',
  rlatitude: '',
  rlongitude: '',
  raddress: '',
  rcuisine: '',
  rdelivery: '',

}


const restReducer = (state = initialRestProfile, action) => {
  switch(action.type) {
    case 'UPDATE': {

      switch(action.field) {

        case 'RID': {

          return {
            rid: action.payload,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone,
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'REMAIL': {

          return {
            rid: state.rid,
            remail: action.payload,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone,
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RPASSWORD': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: action.payload,
            rname: state.rname,
            rphone: state.rphone,
            rphoto: state.rphoto,
            rabout: state.rabout,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RNAME': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: action.payload,
            rphone: state.rphone,
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RPHONE': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: action.payload,
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RABOUT': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: action.payload,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RPHOTO': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: action.payload,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLOCATION': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: action.payload,
            rlatitude: state.rlatitude,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLATITUDE': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: action.payload,
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RLONGITUDE': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: action.payload,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RADDRESS': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: action.payload,
            rcuisine: state.rcuisine,
            rdelivery: state.rdelivery,
          }
        }

        case 'RCUISINE': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: action.payload,
            rdelivery: state.rdelivery,
          }
        }

        case 'RDELIVERY': {

          return {
            rid: state.rid,
            remail: state.remail,
            rpassword: state.rpassword,
            rname: state.rname,
            rphone: state.rphone, 
            rabout: state.rabout,
            rphoto: state.rphoto,
            rlocation: state.rlocation,
            rlatitude: state.rlatitude, 
            rlongitude: state.rlongitude,
            raddress: state.raddress,
            rcuisine: state.rcuisine,
            rdelivery: action.payload,
          }
        }


        default: {
          return state;
        }


      }
    }
    default: {
      return state;
    }


  }

};

export default restReducer;