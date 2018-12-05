import React, { Component } from "react";
import { connect } from "react-redux";
import "./ListNotes.css";
import * as actions from '../../Actions';
import _ from 'lodash';
import thumps_up from "./thumps_up.svg";
import { Flipper, Flipped } from "react-flip-toolkit";
import { zoomIn } from "react-animations";
import SingleNoteModal from "../SingleNoteModal/SingleNoteModal";
import Modal from "react-modal";
import Filter from '../Filter/filter';
import SortBy from '../Sorting/sortby';

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
    this.recommend = this.recommend.bind(this);
    this.byLikes = this.byLikes.bind(this);
    this.byDate = this.byDate.bind(this);
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

  recommend(notes){
    let usertags = this.props.auth.tags;
      let sortedKeys = [];
      for(let key in notes){
        if(notes[key].tags.some(a => usertags.includes(a))){
          sortedKeys.unshift(key);
        }
        else{
          sortedKeys.push(key);
        }
    }
    let output = {};
    for(let key of sortedKeys){
      output[key] = notes[key];
    }
    return output;
  }

  byLikes(notes){
    console.log(notes);
    let output = {};
    let arr = [];
    for(let key in notes){
      arr.push({"key":key,val:notes[key].numberOfLikes});
    }
    arr.sort(function(a,b){ return b.val - a.val});
    for(let obj of arr){
      output[obj.key] = notes[obj.key];
    }
    return output;
  }

  byDate(notes){
    return this.props.notes;
  }
  renderNote(notes) {
    let sort = this.props.sort;
    let val = this.props.filter;
    let output = {};
    if(this.props.filter.length > 0){
      for(let note in notes){
        let tags =  notes[note]['tags'];
        for(let tag of tags){
          for(let value of val){
            if(tag.indexOf(value)>=0){
              output[note] = notes[note];
            }
          }
        }
      }
    }
    else{
      output = this.recommend(notes);
    }
    if(sort){
      if(sort == 1){
        output = this.recommend(output);
      }
      else if(sort == 2){
        output = this.byDate(output);
      }
      else{
        output = this.byLikes(output);
      }
    }

    return _.map(output, note => {
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

      return (
        <div
          className="col-md-3"
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
    console.log(this.props.filter);
    if (this.props.notes === null) {
      return <div>Loading..</div>;
    }
    return (
      <div>
        <div className="row filSort">
          <div className="filterMe">
            <Filter/>
          </div>
          <div className="sortMe">
            <SortBy/>
          </div>
           
        </div>
        <Flipper flipKey="abcd">
          <div className="row noteListMainWrapper">
              {this.props.isCheatSheet===true ? this.renderCheatSheet() : this.renderNote(this.props.notes)}
            {this.renderNoteModal()}
          </div>
        </Flipper>
      </div>  
    );
  }
}

function mapStateToProps({ notes, auth, filter, sort }) {
  return { notes, auth, filter, sort };
}

export default connect(
  mapStateToProps,
  actions
  )(ListNotes);
