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
                <div className='ListTitle'>
                    My Notes
                </div>
                <div className='ListSubTitle'>
                    List of the notes created by you
                </div>
                <ListNotes />
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(MyNotes);
