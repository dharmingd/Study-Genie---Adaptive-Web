import React, { Component } from "react";
import TextareaAutosize from "react-autosize-textarea";
import "./NewNotes.css";
import Switch from "react-switch";
import DropdownList from "react-widgets/lib/DropdownList";
import { TwitterPicker } from "react-color";
import onClickOutside from "react-onclickoutside";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import { Tooltip } from "reactstrap";
import ShareModal from "./ShareModal/ShareModal";
import Multiselect from "react-widgets/lib/Multiselect";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";

import { VelocityTransitionGroup } from "velocity-react";

const styles = {
  zoomIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn")
  }
};

class NewNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRest: false,
      checked: false,
      noteType: "Note",
      showBucket: false,
      showText: false,
      backgroundColor: "white",
      textColor: "black",
      title: "",
      details: "",
      showSuccessMessage: false,
      showErrorMessage: false,
      tags: ["Node", "React", "Redux"],
      values: [],
      tooltipOpen: false,
      textTooltipOpen: false,
      backTooltipOpen: false,
      showTagModal: false,
      showShareModal: false,
      shareTooltipOpen: false,
      map: new Map()
    };
    this.showNewNote = this.showNewNote.bind(this);
    this.renderRestLower = this.renderRestLower.bind(this);
    this.renderRestUpper = this.renderRestUpper.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.showBucket = this.showBucket.bind(this);
    this.showText = this.showText.bind(this);
    this.handleBucketChange = this.handleBucketChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMsg = this.renderMsg.bind(this);
    this.toggle = this.toggle.bind(this);
    this.textToggle = this.textToggle.bind(this);
    this.backToggle = this.backToggle.bind(this);
    this.shareToggle = this.shareToggle.bind(this);
    this.renderTagModal = this.renderTagModal.bind(this);
    this.renderShareModal = this.renderShareModal.bind(this);
    this.addTagsToValue = this.addTagsToValue.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.getGroupsOfUser = this.getGroupsOfUser.bind(this);
  }

  componentDidMount() {
    this.getGroupsOfUser();
  }

  getGroupsOfUser() {
    this.props.getGroup().then(() => {
      console.log(this.props.groups);
      this.props.groups.map(group => {
        this.state.map.set(group._id, false);
      });
    });
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  textToggle() {
    this.setState({
      textTooltipOpen: !this.state.textTooltipOpen
    });
  }

  backToggle() {
    this.setState({
      backTooltipOpen: !this.state.backTooltipOpen
    });
  }

  shareToggle() {
    this.setState({
      shareTooltipOpen: !this.state.shareTooltipOpen
    });
  }

  handleClickOutside = evt => {
    this.setState({
      showBucket: false,
      showText: false,
      showSuccessMessage: false,
      showErrorMessage: false
    });
  };

  handleSwitch(checked) {
    this.setState({ checked });
  }

  showBucket() {
    this.setState({
      showBucket: !this.state.showBucket
    });
  }
  showText() {
    this.setState({
      showText: !this.state.showText
    });
  }

  showNewNote() {
    this.setState({
      showRest: true,
      showSuccessMessage: false,
      showErrorMessage: false
    });
  }

  renderRestUpper() {
    if (this.state.showRest === false) {
      return <div />;
    }
    const titleStyle = {
      color: this.state.textColor,
      fontWeight: "bold"
    };
    return (
      <div className="row">
        <div className="col-md-8">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="noteTitle"
            style={titleStyle}
            value={this.state.title}
            onChange={title => {
              this.setState({ title: title.target.value });
            }}
          />
        </div>
        <div className="col-md-4 switchButton">
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
    );
  }

  handleBucketChange(color) {
    this.setState({
      backgroundColor: color.hex
    });
  }

  renderBucket() {
    if (this.state.showBucket === false) {
      return <div />;
    }

    return (
      <div className="bucketPicker">
        <TwitterPicker
          color={this.state.backgroundColor}
          triangle={"top-right"}
          onChangeComplete={this.handleBucketChange}
        />
      </div>
    );
  }

  handleTextChange(color) {
    this.setState({
      textColor: color.hex
    });
  }

  renderText() {
    if (this.state.showText === false) {
      return <div />;
    }

    return (
      <div className="textPicker">
        <TwitterPicker
          color={this.state.textColor}
          triangle={"top-left"}
          onChangeComplete={this.handleTextChange}
        />
      </div>
    );
  }

  renderRestLower() {
    if (this.state.showRest === false) {
      return <div />;
    }
    const noteType = {
      width: "100px",
      fontSize: "12px",
      backgroundColor: "none",
      color: this.state.textColor,
      display: "inline-block"
    };
    let bucketColor;
    if (
      this.state.backgroundColor === "white" ||
      this.state.backgroundColor === "#ffffff"
    ) {
      bucketColor = {
        color: "#D5DBDB"
      };
    } else {
      bucketColor = {
        color: this.state.backgroundColor
      };
    }

    let textColor;
    if (this.state.textColor === "#ffffff") {
      textColor = {
        color: "#7F8C8D"
      };
    } else {
      textColor = {
        color: this.state.textColor
      };
    }
    const tagTooltip = {
      backgroundColor: "red",
      color: "red"
    };

    return (
      <div className="line">
        <div className="bucketPickerOuter">
          <i
            style={bucketColor}
            className="material-icons bucket"
            onClick={this.showBucket}
            id="backTootltip"
          >
            &#xe23a;
          </i>
          <Tooltip
            placement="bottom"
            isOpen={this.state.backTooltipOpen}
            target="backTootltip"
            toggle={this.backToggle}
          >
            Background Color
          </Tooltip>
          {this.renderBucket()}
        </div>
        <div className="textPickerOuter">
          <div>
            <i
              style={textColor}
              className="material-icons textColor"
              onClick={this.showText}
              id="textTootltip"
            >
              &#xe23c;
            </i>
            <Tooltip
              placement="bottom"
              isOpen={this.state.textTooltipOpen}
              target="textTootltip"
              toggle={this.textToggle}
            >
              Text Color
            </Tooltip>
          </div>
          {this.renderText()}
        </div>
        <div className="dropDownOuter">
          <DropdownList
            style={noteType}
            value={this.state.noteType}
            placeholder="Type of Note"
            data={["Note", "Cheat Sheet"]}
            onChange={val => this.setState({ noteType: val })}
          />
        </div>
        <div className="multiSelectOuter">
          <i
            className="fa fa-tags tagIcon"
            id="tagTootltip"
            onClick={() => {
              this.setState({
                showTagModal: !this.state.showTagModal
              });
            }}
          />
          <Tooltip
            placement="bottom"
            isOpen={this.state.tooltipOpen}
            target="tagTootltip"
            toggle={this.toggle}
          >
            Add tags to post
          </Tooltip>
        </div>
        <div className="shareOuter">
          <i
            className="fa fa-share-alt tagIcon"
            aria-hidden="true"
            id="shareTootltip"
            onClick={() => {
              this.setState({
                showShareModal: !this.state.showShareModal
              });
            }}
          />
          <Tooltip
            placement="bottom"
            isOpen={this.state.shareTooltipOpen}
            target="shareTootltip"
            toggle={this.shareToggle}
          >
            Share Post
          </Tooltip>
        </div>

        <input
          type="submit"
          name="submitPost"
          value="Save"
          className="submitPost"
        />
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    let groups = new Array();

    this.state.map.forEach((key, value) => {
      if (key === true) {
        groups.push(value);
      }
    });

    const data = {
      title: this.state.title,
      content: this.state.details,
      status: this.state.checked === true ? "Private" : "Public",
      backgroundColor: this.state.backgroundColor,
      textColor: this.state.textColor,
      category: this.state.noteType,
        _groups: groups,
        tags: this.state.values
    };
    console.log(data);
    this.props
      .postNote(data)
      .then(() => {
        this.getGroupsOfUser();
        this.setState({
          showRest: false,
          checked: false,
          noteType: "Note",
          showBucket: false,
          showText: false,
          backgroundColor: "white",
          textColor: "#7F8C8D",
          title: "",
          details: "",
          showSuccessMessage: true,
          showTagModal: false,
            values:[]
        });
      })
      .catch(() => {
        alert("error");
        this.setState({
          showErrorMessage: true
        });
      });
  }
  renderMsg() {
    if (this.state.showSuccessMessage) {
      return (
        <div className="successMsgNote">
          Your note has been successfully saved!
        </div>
      );
    }
    if (this.state.showErrorMessage) {
      return (
        <div className="errorMsgNote">We have encountered some error!</div>
      );
    }
    return <div />;
  }
  handleCreate(name) {
    let { tags, values } = this.state;

    this.setState({
      values: [...values, name], // select new option
      tags: [...tags, name] // add new option to our dataset
    });
  }
  addTagsToValue(val) {
    this.setState({ values: val });
  }

  renderTagModal() {
    const tagClass = {
      fontSize: "12px",
      background: "none",
      borderRadius: "0"
    };
    return (
      <VelocityTransitionGroup
        enter={{ animation: "slideDown" }}
        leave={{ animation: "slideUp" }}
      >
        {this.state.showTagModal ? (
          <Multiselect
            style={tagClass}
            value={this.state.values}
            allowCreate="onFilter"
            placeholder="Enter tags for note"
            height={300}
            onCreate={this.handleCreate}
            data={this.state.tags}
            onChange={this.addTagsToValue}
          />
        ) : (
          undefined
        )}
      </VelocityTransitionGroup>
    );
  }

  renderShareModal() {
    if (this.state.showShareModal === false) {
      return <div />;
    }
    return (
      <div>
        <ShareModal
          setTagState={() => {
            this.setState({
              showShareModal: !this.state.showShareModal
            });
          }}
          map={this.state.map}
        />
      </div>
    );
  }

  render() {
    const nTextarea = {
      border: "none",
      width: "90%",
      height: "100%",
      marginLeft: "10px",
      background: "transparent",
      color: this.state.textColor,
      marginBottom: "10px"
    };

    const noteBackground = {
      transition: "0.4s",
      backgroundColor: this.state.backgroundColor,
      color: this.state.textColor
    };

    return (
      <StyleRoot>
        <form onSubmit={this.handleSubmit} style={styles.zoomIn}>
          <div className="nodeOuterMain">
            <div className="noteOuter" style={noteBackground}>
              {this.renderRestUpper()}
              <TextareaAutosize
                placeholder="Add a Note..."
                style={nTextarea}
                onClick={this.showNewNote}
                innerRef={ref => (this.textarea = ref)}
                value={this.state.details}
                onChange={details => {
                  this.setState({ details: details.target.value });
                }}
              />
            </div>
            {this.renderRestLower()}
          </div>
          {this.renderMsg()}
          {this.renderTagModal()}
          {this.renderShareModal()}
        </form>
      </StyleRoot>
    );
  }
}

function mapStateToProps({ groups }) {
  return { groups };
}

export default connect(
  mapStateToProps,
  actions
)(onClickOutside(NewNotes));
