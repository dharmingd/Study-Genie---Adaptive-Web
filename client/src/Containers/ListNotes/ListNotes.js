import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListNotes.css";
import thumps_up from "./thumps_up.svg";
import { Flipper, Flipped } from "react-flip-toolkit";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import Modal from "react-responsive-modal";
import styles from './styles.css';

class ListNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false
    };
  }

  onOpenModal = () => {
    this.setState({ modalOpen: true });
  };

  onCloseModal = () => {
    this.setState({ modalOpen: false });
  };

  renderNoteModal() {
    const { modalOpen } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal
          open={modalOpen}
          onClose={this.onCloseModal}
          center
          classNames={{
            transitionEnter: styles.transitionEnter,
            transitionEnterActive: styles.transitionEnterActive,
            transitionExit: styles.transitionExitActive,
            transitionExitActive: styles.transitionExitActive
          }}
          animationDuration={2000}
        >
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
    );
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
        <div className="col-md-3" style={styles.zoomIn}>
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
