import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListNotes from "../ListNotes/ListNotes";

class SavedNotes extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getSavedPost();
    }

    render() {
        return (
            <div>
                <div className='ListTitle'>
                    Saved Notes
                </div>
                <div className='ListSubTitle'>
                    List of the notes saved by your
                </div>
                <ListNotes />
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(SavedNotes);
