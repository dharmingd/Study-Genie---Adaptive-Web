import React from 'react';
import Multiselect from "react-widgets/lib/Multiselect";
import { connect } from "react-redux";
import * as actions from "../../Actions";

class Filter extends React.Component{

    constructor(props){
        super(props);
        this.state = { tags: [], values: []}
        this.addTagsToValue = this.addTagsToValue.bind(this);
    }

    componentDidMount(){
        let notes = this.props.notes;
        let arr = [];
        for(let key in notes){
            let tags = notes[key].tags;
            for(let tag of tags){
                if(! arr.includes(tag)){
                    arr.push(tag);
                }
            }
        }
        this.setState({tags: arr});
    }

    addTagsToValue(val){
        this.setState({ values: val });
        this.props.updateFilter(val);
    }
    render(){
        const tagClass = {
            fontSize: "12px",
            background: "none",
            borderRadius: "0"
        };
        return(
            <div>
                <Multiselect
                    style={tagClass}
                    value={this.state.values}
                    placeholder="Filter By Your Tags"
                    height={300}
                    data={this.state.tags}
                    onChange={this.addTagsToValue}
                />
            </div>
        );
    }
}

function mapStateToProps({ notes }) {
    return { notes };
  }

export default connect(
    mapStateToProps,
    actions
  )(Filter);
