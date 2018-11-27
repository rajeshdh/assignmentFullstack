import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import HomeView from './views/HomeView';
import client from './ApolloClient';
import store from './store';
import ApartmentView from "./views/ApartmentView";
import LocationView from "./views/LocationView";
import ApartmentSearchView from "./views/ApartmentSearchView";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={HomeView}/>
              <Route exact path="/apartments/:apartmentId" component={ApartmentView}/>
              <Route exact path="/locations" component={LocationView} />
              <Route exact path="/search" component={ApartmentSearchView} />
            </Switch>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
