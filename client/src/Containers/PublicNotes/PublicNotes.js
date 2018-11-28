import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListNotes from "../ListNotes/ListNotes";

class PublicNotes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotePublic();
  }

  render() {
    return (
      <div>
        <ListNotes />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(PublicNotes);
