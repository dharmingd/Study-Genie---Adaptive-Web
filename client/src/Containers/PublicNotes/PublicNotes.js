import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Actions";
import ListNotes from "../ListNotes/ListNotes";

class PublicNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true
    }
  }

  componentDidMount() {
    this.props.getNotePublic().then(()=>{
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
              Public Notes
          </div>
          <div className='ListSubTitle'>
              List of the public notes created by users
          </div>
        <ListNotes />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(PublicNotes);
