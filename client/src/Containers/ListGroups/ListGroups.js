import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListGroups.css";
import * as actions from "../../Actions";
import _ from "lodash";
import { NavLink, withRouter } from "react-router-dom";

class ListGroups extends Component {
  constructor(props) {
    super(props);
    this.renderGroups = this.renderGroups.bind(this);
  }

  componentDidMount() {
    //this.props.getPublicGroups();
  }

  renderGroups() {
    console.log(this.props.publicGroups);
    return _.map(this.props.publicGroups, group => {
      return (
          <div className="col-md-2 groupListWrapper" key={group._id}>

            <NavLink key={group._id} className="row groupListSubWrapper" to={`/user/groups/${group._id}`}>

              <div className="col-md-6 GroupTitle">{group.groupName}</div>
              <div className="col-md-3">
                <i className="fa fa-users" />
                <span className="userSpan">{group._user.length}</span>
              </div>
              <div className="col-md-3">
                <i className="fa fa-sticky-note" />
                <span className="userSpan">{group._note.length}</span>
              </div>
                <div className='createdByList'>
                    Created By: {group._owner.displayName}
                </div>
            </NavLink>

          </div>
      );
    });
  }

  render() {
    if (this.props.publicGroups === null) {
      return <div>Loading..</div>;
    }
      if (_.size(this.props.publicGroups) === 0) {
          return <div>No Groups</div>;
      }
    return <div className='row'>{this.renderGroups()}</div>;
  }
}

function mapStateToProps({ publicGroups, auth }) {
  return { publicGroups, auth };
}

export default connect(
  mapStateToProps,
  actions
)(ListGroups);
