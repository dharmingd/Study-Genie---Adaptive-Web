import React, {Component} from 'react';
import Header from '../Header/Header';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import { BrowserRouter, Route } from 'react-router-dom';
import './dashboard.css';
import UserDetails from '../UserDetails/UserDetails';
import NewNotes from '../NewNotes/NewNotes';
import PublicNotes from '../PublicNotes/PublicNotes';


class Dashboard extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="col-md-2">
                        <LeftSideBar />
                    </div>
                    <div className="col-md-10">
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4 newNoteOuterDiv'><NewNotes/></div>
                                <div className='col-md-4'></div>
                            </div>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <Route path={`${this.props.match.path}/details`} component={UserDetails} />
                                    <Route path={`${this.props.match.path}/public`} component={PublicNotes} />
                                    <Route path={`${this.props.match.path}/private`} component={UserDetails} />
                                </div>
                            </div>

                    </div>
                </div>
            </div>
        );
    }
}


export default Dashboard;