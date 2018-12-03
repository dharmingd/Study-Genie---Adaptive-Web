import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../Actions/index';
import ListNotes from '../ListNotes/ListNotes.js';
import {withRouter} from 'react-router';
import _ from 'lodash';
import './SingleGroups.css';

class SingleGroups extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true
        }
        this.renderMembers = this.renderMembers.bind(this);
        this.renderJoinButton = this.renderJoinButton.bind(this);
        this.joinGroup = this.joinGroup.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.deleteGroup = this.deleteGroup.bind(this);
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.getOneGroup({_id: id}).then(()=>{
            this.setState({loading: false});
            this.props.getGroupNotes(this.props.group._note);
        });
    }

    joinGroup(){
        this.props.joinGroupAction({_id: this.props.group._id, user: this.props.auth});
    }

    leaveGroup(){
        this.props.leaveGroupAction({_id: this.props.group._id, user: this.props.auth});
    }

    deleteGroup(){
        this.props.deleteGroupAction({_id: this.props.group._id}, this.props.history);
    }

    renderJoinButton(){
        //console.log(_.includes(this.props.group._user, this.props.auth.user));
        if(this.props.group._owner._id === this.props.auth._id){
            return <button className='btn leaveButton' onClick={this.deleteGroup}>DELETE</button>
        }

        if(_.some(this.props.group._user, this.props.auth)){
            return <button className='btn leaveButton' onClick={this.leaveGroup}>Leave</button>
        }

        return <button className='btn joinButton' onClick={this.joinGroup}>+ Join</button>
    }

    renderMembers(){
        console.log(this.props.group._owner);
        return _.map(this.props.group._user, (user)=>{
            return (
                <div key={user._id}>
                    <div className='row groupMemberWrapper'>
                        <div className='col-md-2'>
                            <img src={user.profilePicture} className="groupUserPic" />
                        </div>
                        <div className='col-md-10'>
                            <div className='groupMemberName'>{user.displayName}{user._id===this.props.group._owner._id && <span className='owner'>Admin</span>}</div>
                            <div className='groupMemberEmail'>{user.emailId}</div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render(){
        if(this.state.loading===true){
            return <div>Loading.....</div>
        }
        console.log(this.props.group);
        return (
          <div>
            <div className='row groupDisplayWrapper'>
                <div className='col-md-9 groupListWrapperMain'>
                    <div className='row'>
                    <div className='col-md-11'>
                        <div className='groupTitle'>
                            {this.props.group.groupName}
                        </div>
                        <div className='createdBy'>
                            Created By: {this.props.group._owner.displayName}
                        </div>
                    </div>

                    <div className='col-md-1 joinButtonWraaper'>
                            {this.renderJoinButton()}
                    </div>
                    </div>
                    <ListNotes isGroup={true}/>
                </div>
                <div className='col-md-3 groupMemberWrapperMain'>
                    <div className='groupMembers'>
                        Group Members ({this.props.group._user.length})
                    </div>
                    {this.renderMembers()}
                </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps({publicGroups, notes, auth}, ownProps){
    return {
        group: publicGroups[ownProps.match.params.id],
        notes,
        auth
    };
}

export default connect(mapStateToProps, actions)(withRouter(SingleGroups));