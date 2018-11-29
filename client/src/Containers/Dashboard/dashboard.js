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

    changeWidth = (val) => {
        console.log("hereee");
        let bar = document.getElementById("menu");
        let rest = document.getElementById("rest");
        if(val){
            bar.style.width = 5+"%";
            rest.style.width = 95+"%";
        }
        else{
            console.log("find me")
            bar.style.width = 18+"%";
            rest.style.width = 82+"%";
        }
        
    }

    render(){
        return (
            <div>
                <div className="row">
                    <div className="menuBar" id="menu">
                        <LeftSideBar  fromBar = {this.changeWidth}/>
                    </div>
                    <div className="everything" id="rest">
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