import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserRegistartionForm from "../UserRegistration/UserRegistartionForm";
import './UserDetails.css';

class UserDetails extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    submit = (values) => {
        // Do something with the form values
        console.log(values);
        console.log(this.props.form);
    }

    render(){
        if(this.props.auth==null){
            return <div>Loading...</div>
        }

        return (
            <div className="row userDetails">
                <div className="col-md-5 leftUserDetails">
                    <div>
                        <img src={this.props.auth.profilePicture} className='uprofilePic' />
                    </div>
                    <div className='userName'>
                        {this.props.auth.displayName}
                    </div>
                    <div className='userEmail'>
                        {this.props.auth.emailId}
                    </div>
                </div>
                <div className="col-md-7 rightUserDetails">
                    <UserRegistartionForm onSubmit={this.submit}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({auth}){
    return {auth};
}

export default connect(mapStateToProps)(UserDetails);