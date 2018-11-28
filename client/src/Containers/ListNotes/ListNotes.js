import React, {Component} from 'react';
import {connect} from 'react-redux';

class ListNotes extends Component{
    constructor(props){
        super(props);
    }

    renderNote(){
        return this.props.notes.map((note)=>{
            return (
              <div key={note._id}>{note.title}</div>
            );
        })
    }

    render(){
        if(this.props.notes===null){
            return <div>Loading..</div>
        }
        return <div className='row'>{this.renderNote()}</div>
    }
}

function mapStateToProps({notes}){
    return {notes}
}

export default connect(mapStateToProps, null)(ListNotes);