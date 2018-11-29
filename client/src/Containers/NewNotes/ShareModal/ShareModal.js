import React, { Component } from "react";
import Modal from "react-modal";
import Multiselect from "react-widgets/lib/Multiselect";
import { connect } from "react-redux";
import Switch from "react-switch";
import * as actions from "../../../Actions";
import _ from "lodash";
import ListGroup from "./ListGroup";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

const styles = {
  zoomIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn")
  }
};

class ShareModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      users: [],
      groupName: "",
      values: [],
      checked: false,
      userIds: [],
      showMsg: false,
      groups: []
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.addTagsToValue = this.addTagsToValue.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleGroupSubmit = this.handleGroupSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchUsers().then(() => {
      console.log(this.props.users);
      this.setState({
        users: _.map(this.props.users, e => e.emailId)
      });
    });
  }

  handleSwitch(checked) {
    this.setState({ checked });
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
    this.props.setTagState();
  }
  addTagsToValue(val) {
    this.setState({ values: val });
  }

  handleGroupSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    var data = {
      groupName: this.state.groupName,
      _user: _.map(this.state.values, value =>
        _.result(_.find(this.props.users, ["emailId", value]), "_id")
      ),
      status: this.state.checked === true ? "Private" : "Public"
    };
    this.props.postGroup(data).then(() => {
      console.log(this.props.groups);
      this.setState({
        groupName: "",
        values: [],
        status: false,
        showMsg: true
      });
    });
    console.log(data);
  }

  render() {
    const tagClass = {
      fontSize: "14px",
      background: "none",
      borderRadius: "0"
    };
    return (
      <StyleRoot>
        <div style={styles.zoomIn}>
          <Modal
            isOpen={this.state.isOpen}
            ariaHideApp={false}
            shouldFocusAfterRender={true}
            shouldCloseOnOverlayClick={true}
            onRequestClose={this.handleCloseModal}
            className="customModal"
            overlayClassName="customOverlayModal"
            role="dialog"
            closeTimeoutMS={1000}
            style={styles.zoomIn}
          >
            <div className="row">
              <div className="col-md-6 ListGroupWrapper">
                <ListGroup groups={this.props.groups} map={this.props.map} />
              </div>
              <div className="col-md-6 formGroupWrapper">
                <div className="shareGroupTitle">Create New Group</div>
                <form onSubmit={this.handleGroupSubmit}>
                  <div className="row formGroupUpperRow">
                    <div className="col-md-8">
                      <input
                        type="text"
                        name="groupName"
                        placeholder="Enter new group name"
                        value={this.state.groupName}
                        onChange={groupName =>
                          this.setState({ groupName: groupName.target.value })
                        }
                        required="required"
                        className="groupNameInput"
                      />
                    </div>
                    <div className="col-md-4 switchCol">
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleSwitch}
                        onColor="#F1948A"
                        offColor="#85C1E9"
                        //onHandleColor="#CB4335"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={25}
                        width={60}
                        uncheckedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 11,
                              color: "white",
                              paddingRight: 2
                            }}
                          >
                            Public
                          </div>
                        }
                        checkedIcon={
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                              fontSize: 10,
                              color: "white",
                              paddingRight: 2
                            }}
                          >
                            Private
                          </div>
                        }
                        id="material-switch"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Multiselect
                        style={tagClass}
                        value={this.state.values}
                        placeholder="Enter user's emails"
                        height={300}
                        data={this.state.users}
                        onChange={this.addTagsToValue}
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Create new group"
                    className="createGroupBtn"
                  />
                  {this.state.showMsg === true ? (
                    <div className="groupCreatedMsg">
                      New group has been created!
                    </div>
                  ) : (
                    undefined
                  )}
                </form>
              </div>
            </div>
              <div className="modalCloseBtnContainer">
                  <button onClick={this.handleCloseModal} className="modalCloseBtn">
                      <i className="far fa-times-circle modalClodeBtnIcon"/>
                  </button>
              </div>
          </Modal>
        </div>
      </StyleRoot>
    );
  }
}

function mapStateToProps({ users, groups }) {
  return { users, groups };
}

export default connect(
  mapStateToProps,
  actions
)(ShareModal);
