import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListGroups from "../ListGroups/ListGroups";

class PublicGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.getPublicGroups().then(()=>{
            this.setState({loading: false});
        });
    }

    render() {
        if(this.state.loading===true){
            return <div>Loading.....</div>
        }

        return (
            <div>
                <div className='ListTitle'>
                    Public Groups
                </div>
                <div className='ListSubTitle'>
                    List of the public groups created by users
                </div>
                <ListGroups />
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(PublicGroups);
