import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import Header from './Header/header';
import LandingPage from './LandingPage/landingPage';
import LeftSideBar from './LeftSideBar/leftSideBar';
import Dashboard from './Dashboard/dashboard';
class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <LeftSideBar/>
            <Route exact path="/" component={LandingPage} />
              <Route exact path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
