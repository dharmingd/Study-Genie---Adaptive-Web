import React, {Component} from 'react';
import './UserRegistrationForm.css';
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'
import * as actions from '../../Actions';
import 'react-widgets/dist/css/react-widgets.css';
import universities from './universities';
import {connect} from "react-redux";


class UserRegistartionForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            universities: universities.map((uni) => uni.institution ),
            tags:['Node', 'React', 'Redux'],
            values: [],
            gender: null,
            university: null,
            loading: false,
            showMessage: false
        }
    }

    handleSubmit(event){
        console.log(this.state);
        event.preventDefault();
        const data = {
            gender: this.state.gender,
            university: this.state.university,
            tags: this.state.values
        }
        this.setState( {
            loading: true,
            showMessage:false
        });
        this.props.postUserDetails(data).then(()=>{
            console.log("Done");
            this.setState({
                loading: false,
                showMessage:true
            });

        })


    }

    handleCreate(name) {
        let { tags, values } = this.state;

        this.setState({
            values: [...values, name],  // select new option
            tags: [...tags, name] // add new option to our dataset
        })
    }

    renderMessage(){
        if(this.state.showMessage){
            return <div className='successMsg'>Your information has been successfully saved!</div>
        }
        return <div/>;
    }

    render() {
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return (
            <form onSubmit={(event)=>this.handleSubmit(event)} className='userForm'>
                <div className='formField'>
                    <label className='uformLabel'>Gender</label>
                    <SelectList value={this.state.gender} data={['Male', 'Female']} onChange={(val)=>this.setState({gender:val})} />
                </div>
                <div className='formField'>
                    <label className='uformLabel'>University</label>
                    <DropdownList value={this.state.university} placeholder='Enter University Name' filter data={this.state.universities} onChange={(val)=>this.setState({university:val})} />
                </div>
                <div className='formField'>
                    <label className='uformLabel'>Tags</label>
                    <Multiselect value={this.state.values} allowCreate="onFilter" placeholder='Enter tags for note recommendations' onCreate={name => this.handleCreate(name)} data={this.state.tags} onChange={(val)=>this.setState({values:val})} />
                </div>
                <div>
                    <button type="submit" className='saveBtn' disabled={this.state.loading}>Submit</button>
                </div>
                <div>
                    {this.renderMessage()}
                </div>
            </form>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps, actions)(UserRegistartionForm);
