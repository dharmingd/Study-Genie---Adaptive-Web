import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import {fetchWeather} from '../actions/index';

class SearchBar extends Component{

    constructor(props){
        super(props);
        this.state = {term: ''};
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onInputChange(event){
        this.setState({
            term: event.target.value
        });
    }

    onSubmitForm(event){
        event.preventDefault();
        this.props.fetchWeather(this.state.term);
        this.setState({term:''});
    }

    render(){
        return (
            <div className="searchBar search-box">
                    <input className='search-txt' value={this.state.term} onChange={this.onInputChange}/>
                    <a className='search-btn' href="#"><i className="fas fa-search"></i></a>
            </div>
        );
    }
}


export default SearchBar;

// function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchWeather}, dispatch);
// }

// export default connect(null, mapDispatchToProps)(SearchBar);