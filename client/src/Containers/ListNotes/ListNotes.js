import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListNotes.css";
import * as actions from '../../Actions';
import _ from 'lodash';
import thumps_up from "./thumps_up.svg";
import { Flipper, Flipped } from "react-flip-toolkit";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import SingleNoteModal from "../SingleNoteModal/SingleNoteModal";
import Modal from "react-modal";

class ListNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      singleNote: ""
    };
    this.submitLike = this.submitLike.bind(this);
    this.removeLiked = this.removeLiked.bind(this);
    this.removeFavorited = this.removeFavorited.bind(this);
    this.submitFavorite = this.submitFavorite.bind(this);
    this.renderCheatSheet = this.renderCheatSheet.bind(this);
  }

  componentDidMount() {}

  renderNoteModal() {
    if (this.state.modalOpen === false) {
      return <div />;
    }
    return (
      <SingleNoteModal
        submitLike={this.submitLike}
        removeLiked={this.removeLiked}
        submitFavorite={this.submitFavorite}
        removeFavorited={this.removeFavorited}
        note={this.state.singleNote}
        onClose={() => this.setState({ modalOpen: false })}
      />
    );
  }

  openSingleNoteModal(note) {
    this.setState({
      modalOpen: true,
      singleNote: note._id
    });
  }

  submitLike(event, postId) {
    event.stopPropagation();
    const data = {
      _note: postId
    };
    this.props.postLike(data);
  }

  removeLiked(event, postId) {
    event.stopPropagation();
    const data = {
      _note: postId
    };
    console.log(data);
    this.props.removeLike(data);
  }

  submitFavorite(event, postId) {
    event.stopPropagation();
    const data = {
      _note: postId
    };
    this.props.postFavorite(data);
  }

    removeFavorited(event, postId) {
    event.stopPropagation();
    const data = {
      _note: postId
    };
    console.log(data);
    this.props.removeFavorite(data);
  }

  renderNote(notes) {

    console.log(notes);
    return _.map(notes, note => {
      const noteListTitleWrapper = {
        backgroundColor: "#424242",
        color: "white",
        padding: "5px",
        paddingRight: "0",
        borderRadius: "1px"
      };

      const thumbsUp = {
        color: "white"
      };
      console.log(note.isLiked);

      let className;
      if(this.props.isGroup){
        className = "col-md-4 groupListMargin";
      }else{
        className ="col-md-3";
      }

      return (
        <div
          className={className}
          onClick={() => this.openSingleNoteModal(note)}
          key={note._id}
        >
          <Flipped key={note._id} flipId={note._id}>
            <div className="noteListWrapper">
              <div className="fixHeight">
                <div className="row" style={noteListTitleWrapper}>
                  <div className="col-md-9 noteListTile">{note.title}</div>
                  <div className="col-md-1 noteListHeart">
                    {note.isFavorite === "true" ? (
                      <i
                        className="material-icons heart"
                        style={thumbsUp}
                        onClick={event => this.removeFavorited(event, note._id)}
                      >
                        favorite
                      </i>
                    ) : (
                      <i
                        className="material-icons heart"
                        onClick={event => this.submitFavorite(event, note._id)}
                      >
                        favorite_border
                      </i>
                    )}
                  </div>
                  <div className="col-md-2 noteListLike">
                    {note.isLiked === "true" ? (
                      <i
                        className="fa fa-thumbs-up thumbsUp"
                        style={thumbsUp}
                        onClick={event => this.removeLiked(event, note._id)}
                      />
                    ) : (
                      <i
                        className="fa fa-thumbs-o-up thumbsUp"
                        onClick={event => this.submitLike(event, note._id)}
                      />
                    )}
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
                {note.tags.map(tag => (
                  <div className="nodeListTag" key={tag}>
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
            </div>
          </Flipped>
        </div>
      );
    });
  }

    renderCheatSheet(){
      if(this.props.isOwner===true){
        const notes = _.map(this.props.notes, (note)=>{
          if(note._user === this.props.auth._id) return note;
        });
        return this.renderNote(_.without(notes, undefined));
      }
        const notes = _.map(this.props.notes, (note)=>{
            if(note._user !== this.props.auth._id) return note;
        });
        return this.renderNote(_.without(notes, undefined));
    }

  render() {
    if (this.props.notes === null) {
      return <div>Loading..</div>;
    }
    console.log(_.size(this.props.notes));
    if(_.size(this.props.notes)===0){
      return <div className='noPost'>There are no notes posted.</div>
    }

    return (
      <StyleRoot>
        <Flipper flipKey="abcd">
          <div className="row noteListMainWrapper">
              {this.props.isCheatSheet===true ? this.renderCheatSheet() : this.renderNote(this.props.notes)}
            {this.renderNoteModal()}
          </div>
        </Flipper>
      </StyleRoot>
    );
  }
}

function mapStateToProps({ notes, auth }) {
  return { notes, auth };
}

export default connect(
  mapStateToProps,
  actions
  )(ListNotes);
