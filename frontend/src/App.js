import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Main from './Components/Main';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const client = new ApolloClient({
  // uri: 'http://localhost:3001/graphql'
  uri: `${process.env.REACT_APP_BACKEND}/graphql`
});

class App extends Component{
  render() {
  	return (
    // Use Browser Router to route to different pages
      <ApolloProvider client={client}>
  	    <BrowserRouter>
  	      <div>
  	        { /* App Component Has a Child Component called Main */}
  	        <Main/>
  	      </div>
  	    </BrowserRouter>
      </ApolloProvider>
	);
  }
}

export default App;
