import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './Survey/SurveyList';
class Dashboard extends Component {
  render() {
    return (
      <div>
        <h4
          className="container red-text text-lighten-3"
          style={{ marginTop: '40px', marginBottom: '20px' }}
        >
          Dashboard
        </h4>
        <SurveyList />
        <div className="fixed-action-btn">
          <Link to="/survey/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
