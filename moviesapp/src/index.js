import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MovieList, MovieDetail } from './pages';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/movies" component={MovieList} />
          <Route exact path="/movies/:id" component={MovieDetail} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
