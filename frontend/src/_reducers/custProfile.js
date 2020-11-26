const initialCustProfile = {
  cid: '',
	cemail: '',
	cpassword: '',
  cname: '',
  cphone: '',
  cabout: '',
  cjoined: '',
  cphoto: '',
  cfavrest: '',
  cfavcuisine: '',
}

const custReducer = (state = initialCustProfile, action) => {
  switch(action.type) {
	case 'UPDATE': {

	  switch(action.field) {

      case 'CID' : {

        return {
          cid: action.payload,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CEMAIL' : {
        return {
          cid: state.cid,
          cemail: action.payload,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CPASSWORD' : {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: action.payload,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }
      
	  	case 'CNAME' : {

	    	return {
    		  cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: action.payload,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
	    	}
	    }

      case 'CPHONE': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: action.payload,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CJOINED': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: action.payload,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CABOUT': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: action.payload,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CPHOTO': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: action.payload,
          cfavrest: state.cfavrest,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CFAVREST': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: action.payload,
          cfavcuisine: state.cfavcuisine,
        }
      }

      case 'CFAVCUISINE': {

        return {
          cid: state.cid,
          cemail: state.cemail,
          cpassword: state.cpassword,
          cname: state.cname,
          cphone: state.cphone,
          cabout: state.cabout,
          cjoined: state.cjoined,
          cphoto: state.cphoto,
          cfavrest: state.cfavrest,
          cfavcuisine: action.payload,
        }
      }
	    

	    default : {
	    	return state;
	    }
	  }
	}

	default:
      return state
  }
  
}

export default custReducer;