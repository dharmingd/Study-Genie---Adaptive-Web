import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListNotes.css";
import thumps_up from "./thumps_up.svg";
import { Flipper, Flipped } from "react-flip-toolkit";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import SingleNoteModal from "../SingleNoteModal/SingleNoteModal";
import Modal from "react-modal";
import styles from "./styles.css";

class ListNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      singleNote: {}
    };
  }

  renderNoteModal() {
    if (this.state.modalOpen === false) {
      return <div />;
    }
    return <SingleNoteModal note={this.state.singleNote} onClose={()=>this.setState({modalOpen: false})}/>;
  }

  openSingleNoteModal(note) {
    this.setState({
      modalOpen: true,
      singleNote: note
    });
  }

  renderNote() {
    return this.props.notes.map(note => {
      const noteListTitleWrapper = {
        backgroundColor: "#424242",
        color: "white",
        padding: "5px",
        paddingRight: "0",
        borderRadius: "1px"
      };
      return (
        <div
          className="col-md-3"
          style={styles.zoomIn}
          onClick={() => this.openSingleNoteModal(note)}
        >
          <Flipped key={note._id} flipId={note._id}>
            <div className="noteListWrapper">
              <div className="fixHeight">
                <div className="row" style={noteListTitleWrapper}>
                  <div className="col-md-9 noteListTile">{note.title}</div>
                  <div className="col-md-1 noteListHeart">
                    <i className="material-icons heart">favorite_border</i>
                  </div>
                  <div className="col-md-2 noteListLike">
                    <i className="fa fa-thumbs-o-up thumbsUp" />
                    <div className="iconText">{note.numberOfLikes || 0}</div>
                  </div>
                </div>
                <div className="row nodeListBorder">
                  <div className="col-md-12 nodeListContent">
                    {note.content}
                    <div id="bottom_fade" />
                  </div>
                </div>
              </div>
              <div>
                {note.tags.map(tag => <div className="nodeListTag">{tag}</div>)}
                {note.category === "Note" ? (
                  <div className="nodeListTag nodeListCategoryNote">
                    {note.category}
                  </div>
                ) : (
                  <div className="nodeListTag nodeListCategoryCheatsheet">
                    {note.category}
                  </div>
                )}
              </div>
            </div>
          </Flipped>
        </div>
      );
    });
  }

  render() {
    if (this.props.notes === null) {
      return <div>Loading..</div>;
    }
    return (
      <StyleRoot>
        <Flipper flipKey="abcd">
          <div className="row noteListMainWrapper">
            {this.renderNote()}
            {this.renderNoteModal()}
          </div>
        </Flipper>
      </StyleRoot>
    );
  }
}

function mapStateToProps({ notes }) {
  return { notes };
}

export default connect(
  mapStateToProps,
  null
)(ListNotes);
