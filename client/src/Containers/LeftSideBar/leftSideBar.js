import React, { Component } from "react";
import "./leftBar.css";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import close from '../../close.png';
import menuIcon from '../../menu.png';

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {show: true};
    this.closeIt = this.closeIt.bind(this);
  }

  closeIt(val){
    this.setState({show: !val});
    this.props.fromBar(val);
    if(val){
      document.getElementsByClassName("leftBar")[0].style.width = 5+"%";
      let menu = document.getElementById("change");
      menu.style.display = "block";
      menu.style.marginLeft = 30+"%";
      document.getElementById("closeB").style.display ="none";
      let elements = document.getElementsByClassName('iconCategory');
      elements[0].style.marginTop = 60+"%";
      for (let element of elements){
        element.style.paddingLeft = 38+"%";
        element.style.paddingTop = 10+"px";
      }
    }
    else{
      document.getElementsByClassName("leftBar")[0].style.width = 18+"%";
      document.getElementById("change").style.display = "none";
      document.getElementById("closeB").style.display = "block";
      let elements = document.getElementsByClassName('iconCategory');
      elements[0].style.marginTop = 0+"%";
      for (let element of elements){
        element.style.paddingLeft = 40+"px";
        element.style.paddingTop = 10+"px";
      }
    }
  }

  render() {
    if (this.props.auth === null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="leftBar">
        <i className="material-icons" onClick={() => this.closeIt(true)} id="closeB">
          close
        </i>
        <i className="material-icons"  onClick={() => this.closeIt(false)} id="change">
          menu
        </i>
       { this.state.show && 
        <div className="centerLeft titleOuter">
          <NavLink
            to={this.props.auth ? "/surveys" : "/"}
            className="titleLink"
          >
            <i className="fa fa-sticky-note" aria-hidden="true" /> Study Genie
          </NavLink>
        </div>
       }
        <div className="centerLeft">
          <img src={this.props.auth.profilePicture} className="profilePic" />
        </div>
        { this.state.show && 
        <div className="userNameLeft centerLeft">
          {this.props.auth.displayName}
        </div>
        }
        <div className="iconCategory">
          <NavLink
            to="/user/public/notes"
            className="navlink"
            activeClassName="selectedNavBarLink"
            index={true}
          >
            <div className="icon">
              <i className="fa fa-users" />
            </div>
            {this.state.show && <div className="category">Public Notes</div>}
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/mynotes"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-user" />
            </div>
            {this.state.show &&<div className="category">My Notes</div>}
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/saved"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-heart" />
            </div>
            {this.state.show &&<div className="category">Saved Notes</div>}
          </NavLink>
        </div>
        <div className="iconCategory">
          <NavLink
            to="/user/cheatsheets"
            className="navlink"
            activeClassName="selectedNavBarLink"
          >
            <div className="icon">
              <i className="fa fa-code" />
            </div>
            {this.state.show &&<div className="category">Cheat Sheets</div>}
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
            {this.state.show && <div className="category">Collaborative Notes</div>}
          </NavLink>
        </div>
          <div className='lineHoOuter'>
        <hr className='lineHo'/>
          </div>
          <div className="iconCategory">
              <NavLink
                  to="/user/public/groups"
                  className="navlink"
                  activeClassName="selectedNavBarLink"
              >
                  <div className="icon groupWorkIconPadding">
                      <i className="material-icons groupWorkIcon">group_add</i>
                  </div>
                  {this.state.show && <div className="category">Public Groups</div>}
              </NavLink>
          </div>
          <div className="iconCategory">
              <NavLink
                  exact
                  to="/user/my/groups"
                  className="navlink"
                  activeClassName="selectedNavBarLink"
              >
                  <div className="icon groupWorkIconPadding">
                      <i className="material-icons groupWorkIcon">group_work</i>
                  </div>
                  {this.state.show && <div className="category">My Groups</div>}
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
