import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListNotes from "../ListNotes/ListNotes";
import './CheatSheet.css';

class CheatSheet extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCheatSheets();
    }

    render() {
        return (
            <div>
                <div className='ListTitle'>
                    Your Cheat Sheets
                </div>
                <div className='ListSubTitle'>
                    List of the cheat sheets created by you
                </div>
                <ListNotes isCheatSheet={true} isOwner={true}/>
                <div className='ListTitle'>
                    Public Cheat Sheets
                </div>
                <div className='ListSubTitle'>
                    List of the public cheat sheets created by other users
                </div>
                <ListNotes isCheatSheet={true} isOwner={false}/>
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(CheatSheet);
