import React,{Component} from 'react';
import _ from 'lodash';
import './ListGroup.css';
class ListGroup extends Component{

    constructor(props){
        super(props);
        this.selectGroup = this.selectGroup.bind(this);
        this.state = {
            map: this.props.map
        }
        console.log(this.state.map);
    }

    selectGroup(id, groupName){
        this.setState({
            map: this.state.map.set(id, !this.state.map.get(id))
        });
    }

    renderGroups(){

        if(this.props.groups===null){
            return <div>Loading...</div>
        }

        if(this.props.groups.length===0){
            return <div style={{color: "#EC7063", fontWeight:"bold"}}>You haven't created any group. Please create a group first.</div>
        }

        const groupWrapperStyle={
            border: "1px solid #3498DB",
            color: "#3498DB",
            fontWeight: "bold"
        }

        const groupName ={
            color: "#3498DB"
        }

        return this.props.groups.map((group)=>{
            return (
                <div key={group._id} >
                    <div className="row groupWrapper" style={this.state.map.get(group._id)===true? groupWrapperStyle: null} onClick={()=>this.selectGroup(group._id, group.groupName)}>
                        <div className='col-md-6 groupName' style={this.state.map.get(group._id)===true? groupName: null}>
                            {group.groupName}
                        </div>
                        <div className='col-md-3'>
                            <i className="fa fa-users" />
                            <span className="userSpan">{group._user.length}</span>
                        </div>
                        <div className='col-md-3'>
                            <i className="fa fa-sticky-note"/>
                            <span className="userSpan">{group._note.length}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    render(){
            return (
                <div>
                    <div className='shareGroupTitle'>
                        Select groups you want to share the post with
                    </div>
                    <div className='groupsWrapper'>
                        {this.renderGroups()}
                    </div>
                </div>
            )
    }
}

export default ListGroup;