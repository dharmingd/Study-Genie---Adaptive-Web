import React, {Component} from 'react';
import image from '../../study.png';
import './study.css';

class StudyGenie extends Component{
    render(){
        return (
            <div class="page">
                <div className="left">
                    <img src={image} className="img"/>
                </div>
                <div className="right">
                    <h2> Welcome to Study Genie!</h2>
                    <h4>Genie that helps ease education</h4>
                    <div>
                        It unifies all your study materials together, making your preparation
                        better, study a lot better. Seamlessly integrate your notes, cheatsheets,
                        view, collaborate with your classmates. Find everything in one place!
                    </div>
                    <div>
                        View your top recommendations, favourite the notes you find useful,
                        find notes based on your useful topics!.
                    </div>
                </div>
                
            </div>
            
        );
    }
}

export default StudyGenie;