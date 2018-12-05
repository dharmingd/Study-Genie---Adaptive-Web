import React from 'react';
import { connect } from "react-redux";
import * as actions from '../../Actions';

class SortBy extends React.Component{

    constructor(props){
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    clicked(val){
        this.props.updateSort(val);
    }


    render(){
        return(
            <div>
                <div className="dropdown">
                    <button className="btn btn-info btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sort
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#" onClick={() => this.clicked(1)}>By Relevance</a>
                        <a className="dropdown-item" href="#" onClick={() => this.clicked(2)}>By Date</a>
                        <a className="dropdown-item" href="#" onClick={() => this.clicked(3)}>By Popularity</a>
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(
    null,
    actions
  )(SortBy);