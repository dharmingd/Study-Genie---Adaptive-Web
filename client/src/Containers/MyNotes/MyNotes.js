import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListNotes from "../ListNotes/ListNotes";

class MyNotes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getNoteOwn();
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
)(MyNotes);
