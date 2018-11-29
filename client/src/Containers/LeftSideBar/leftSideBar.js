import React, { Component } from "react";
import "./leftBar.css";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.auth === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="leftBar">
        <div className="centerLeft titleOuter">
          <NavLink
            to={this.props.auth ? "/surveys" : "/"}
            className="titleLink"
          >
            <i className="fa fa-sticky-note" aria-hidden="true" /> Study Genie
          </NavLink>
        </div>
        <div className="centerLeft">
          <img src={this.props.auth.profilePicture} className="profilePic" />
        </div>
        <div className="userNameLeft centerLeft">
          {this.props.auth.displayName}
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/public"
            className="navlink"
            activeClassName="selectedNavBarLink"
            index={true}
          >
            <div className="icon">
              <i className="fa fa-users" />
            </div>
            <div className="category">Public Notes</div>
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/private"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-user" />
            </div>
            <div className="category">My Notes</div>
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/private"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-heart" />
            </div>
            <div className="category">Saved Notes</div>
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/private"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-code" />
            </div>
            <div className="category">Cheat Sheets</div>
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/private"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-users" />
            </div>
            <div className="category">Collaborative Notes</div>
          </NavLink>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default withRouter(connect(mapStateToProps)(LeftSideBar));
