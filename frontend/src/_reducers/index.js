import loggedReducer from './isLogged';
import custReducer from './custProfile';
import restReducer from './restProfile';
import whoIsLoggedReducer from './whoislogged';
import cartReducer from './cartReducer';
import {combineReducers} from 'redux';

const allReducer = combineReducers({
	//equivalent: counterReducer: counterReducer
	//JS6 shorthand: counterReducer
	isLogged: loggedReducer,
	custProfile: custReducer,
  restProfile: restReducer,
  whoIsLogged: whoIsLoggedReducer,
  cart: cartReducer,

})


export default allReducer;