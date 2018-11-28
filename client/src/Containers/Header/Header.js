import React, { Component } from "react";
import "./Header.css";
import { connect } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";


class Header extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.auth);
  }
  renderContent() {
    if (this.props.auth === null) {
        return <div>Loading...</div>;
    }

    return (
      <div className='row'>
          <div className='col-md-9'>
          </div>
          <div className='col-md-2'>
              <SearchBar />
          </div>
          <div className='col-md-1'>
              <img src={this.props.auth.profilePicture} className="profilePic" />
          </div>
      </div>
    );
  }

  render() {
    return (
       <div className="row Header ">
           <div className='col-md-2'>
               <div className="title">
                   <Link to={this.props.auth ? "/surveys" : "/"} className="titleLink">
                       <i className="fa fa-sticky-note" aria-hidden="true"></i> Study Genie
                   </Link>
               </div>
           </div>
           <div className='col-md-10 searchProf'>{this.renderContent()}</div>
       </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
