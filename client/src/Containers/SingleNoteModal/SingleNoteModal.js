import React, { Component } from "react";
import "./SingleNoteModal.css";
import Modal from "react-modal";
import TextareaAutosize from "react-autosize-textarea";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ShareModal from "../NewNotes/ShareModal/ShareModal";
import { withRouter } from "react-router";
import axios from "axios/index";
import Popup from '../../Components/Popup/popup';

class SingleNoteModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      note: {},
      map: new Map(),
      showShareModal: false,
      showShareMessage: false,
      showUpdateNoteMsg: false,
        isDeleted: false,
        showPopup:false
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.renderShareModal = this.renderShareModal.bind(this);
    this.shareNoteBtn = this.shareNoteBtn.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    this.setState({
      note: this.props.note
    });

    const data = {
      _user: this.props.auth._id,
      _note: this.props.note
    };

    this.props.getGroup().then(() => {
      console.log(this.props.groups+'');
      this.props.groups.map(group => {
        this.state.map.set(group._id, false);
      });
    });
  }
  
  handleFocus(){
    console.log(window.getSelection());
    this.setState({showPopup:true});
  }
  async deleteNote(event) {
    event.preventDefault();
    event.stopPropagation();
      const res = await axios.put("/api/note/delete", {_id: this.props.notes[this.props.note]._id});
      this.setState({
          isDeleted: true
      })
      const pathname = this.props.history.location.pathname;
      console.log(this.props.history.location.pathname);
      if(pathname==='/user/mynotes'){
          this.props.getNoteOwn();
      }else if(pathname==='/user/public/notes'){
            this.props.getNotePublic();
      }else if(pathname==='/user/saved'){
            this.props.getSavedPost();
      }
  }

  handleCloseModal() {
    this.setState({ isOpen: false });
    this.props.onClose();
  }

  shareNoteBtn() {
    let groups = new Array();
    this.state.map.forEach((key, value) => {
      if (key === true) {
        groups.push(value);
      }
    });
    const data = {
      _groups: groups,
      _id: this.props.note
    };
    this.props.shareNote(data).then(() => {
      this.setState({
        showShareMessage: true
      });
    });
  }

  renderShareModal() {
    if (this.state.showShareModal === false) {
      return <div />;
    }
    return (
      <div className="Hello">
        <ShareModal
          setTagState={() => {
            this.setState({
              showShareModal: false
            });
          }}
          map={this.state.map}
          shareButton={true}
          shareNoteBtn={this.shareNoteBtn}
          showShareMessage={this.state.showShareMessage}
        />
      </div>
    );
  }

  saveChanges(event) {
    event.preventDefault();
    const data = {
      _id: this.props.note,
      title: event.target.title.value,
      content: event.target.content.value
    };
    //console.log(data);
    this.props.updateNote(data).then(() => {
      this.setState({
        showUpdateNoteMsg: true
      });
    });
  }
  changePosition = (x,y,text) => {

    console.log(x,y,text);
    console.log(document.getElementById("popup"),"here");
    document.getElementById("popup").style.display = "block";
    var d = document.getElementById("popup");
    d.style.position = "fixed";
    d.style.left = x+'px';
    d.style.top=y-60+'px';
}

  render() {
    const nTextarea = {
      border: "none",
      width: "99%",
      height: "100%",
      paddingLeft: "10px",
      paddingTop: "10px",
      textAlign: "justify",
      background: "transparent"
      //fontWeight: "bolder"
    };
    const thumbsUp = {
      color: "white"
    };
    console.log(this.props.note);
    console.log(this.props.notes);
    const note = this.props.notes[this.props.note];

    console.log(note);

    return (
      <Modal
        isOpen={this.state.isOpen}
        ariaHideApp={false}
        shouldFocusAfterRender={true}
        shouldCloseOnOverlayClick={true}
        onRequestClose={this.handleCloseModal}
        className="singleNoteModal"
        overlayClassName="singleNoteOverlayModal"
        role="dialog"
        //closeTimeoutMS={1000}
      >
        {this.state.isDeleted ? (
          <div className='deltetedMsg'>Your Post has been deleted</div>
        ) : (
          <form onSubmit={this.saveChanges}>
            <div className="row singleNoteTitleWrapper">
              <div className="col-md-10 singleNoteTitle">
                <input
                  autoFocus
                  defaultValue={note.title}
                  id="title"
                  readOnly={this.props.auth._id !== note._user}
                  className="singleNoteTitleText"
                />
              </div>
              <div id="popup"><Popup selection={window.getSelection()} fromPopup={this.changePosition}/></div>
              <div className="col-md-2">
                <div className="row">
                  <div className="col-md-4">
                    {note.isFavorite === "true" ? (
                      <i
                        className="material-icons heart"
                        style={thumbsUp}
                        onClick={event =>
                          this.props.removeFavorited(event, note._id)
                        }
                      >
                        favorite
                      </i>
                    ) : (
                      <i
                        className="material-icons heart"
                        onClick={event =>
                          this.props.submitFavorite(event, note._id)
                        }
                      >
                        favorite_border
                      </i>
                    )}
                  </div>
                  <div className="col-md-6">
                    {note.isLiked === "true" ? (
                      <i
                        className="fa fa-thumbs-up thumbsUp"
                        style={thumbsUp}
                        onClick={event =>
                          this.props.removeLiked(event, note._id)
                        }
                      />
                    ) : (
                      <i
                        className="fa fa-thumbs-o-up thumbsUp"
                        onClick={event =>
                          this.props.submitLike(event, note._id)
                        }
                      />
                    )}
                    <div className="iconText">{note.numberOfLikes || 0}</div>
                  </div>
                  <div className="col-md-2">
                    <i
                      className="material-icons tagIconSingle"
                      aria-hidden="true"
                      id="shareTootltip"
                      onClick={() => {
                        this.setState({
                          showShareModal: !this.state.showShareModal
                        });
                      }}
                    >
                      share
                    </i>
                  </div>
                </div>
              </div>
            </div>
            <TextareaAutosize
              placeholder="Add a Note..."
              style={nTextarea}
              innerRef={ref => (this.textarea = ref)}
              defaultValue={note.content}
              id="content"
              readOnly={this.props.auth._id !== note._user}
              onClick={this.handleFocus}
            />
            <div>
              {note.tags.map((tag, index) => (
                <div className="nodeListTag" key={index}>
                  {tag}
                </div>
              ))}
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

            {this.props.auth._id === note._user && (
              <div className="saveChangesBtnWrapper">
                {this.state.showUpdateNoteMsg && (
                  <span className="saveMsg">Saved!</span>
                )}
                <input
                  type="submit"
                  value="Save Changes"
                  className="saveChangesBtn"
                />
                <button
                  onClick={this.deleteNote}
                  type="button"
                  className="saveChangesBtn deleteBtn"
                >
                  Delete Note
                </button>
              </div>
            )}
          </form>
        )}

        {this.renderShareModal()}
      </Modal>
    );
  }
}

function mapStateToProps({ auth, groups, notes }) {
  return { auth, groups, notes };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(SingleNoteModal));
