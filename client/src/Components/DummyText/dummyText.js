import React, {Component} from 'react';
import Popup from '../Popup/popup';

class DummyText extends Component{

    constructor(props){
        super(props);
        this.state = {showPopup:false};
        this.handleFocus = this.handleFocus.bind(this);
    }
    componentDidMount(){
        document.getElementById("popup").style.display = "none";
    }
    handleFocus(){
        this.setState({showPopup:true});
    }

    changePosition = (x,y) => {
        console.log(x,y);
        document.getElementById("popup").style.display = "block";
        var d = document.getElementById("popup");
        d.style.position = "fixed";
        d.style.left = x+'px';
        d.style.top=y-60+'px';
    }

    render(){
        return (
            <div className="page" onClick={this.handleFocus}>
                <div id="popup"><Popup selection={window.getSelection()} fromPopup={this.changePosition}/></div>
                <div className="right">
                    <h2> Welcome to Study Genie!</h2>
                    <h4>Genie that helps ease education</h4>
                    <div>
                        It unifies all your study materials together, making your preparation
                        better, study a lot better. Seamlessly integrate your notes, cheatsheets,
                        view, collaborate with your classmates. Find everything in one place!
                    </div>
                    <div id="abcd">
                        View your top recommendations, favourite the notes you find useful,
                        find notes based on your useful topics!.
                    </div>
                    <br/><br/>
                </div>
                
            </div>
            
        );
    }
}

export default DummyText;