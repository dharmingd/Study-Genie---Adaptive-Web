import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListGroups from "../ListGroups/ListGroups";

class MyGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.getMyGroups().then(()=>{
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
                    My Groups
                </div>
                <div className='ListSubTitle'>
                    List of the groups created by you
                </div>
                <ListGroups />
            </div>
        );
    }
}

export default connect(
    null,
    actions
)(MyGroups);
