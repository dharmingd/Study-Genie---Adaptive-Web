import React from 'react';
import './popup.css';
import axios from "axios";

export default class Popup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cheatsheets: null,
            selectedText: null
        }

    }

    async componentDidMount(){
        const res = await axios.get('/api/cheetsheets/list');
        console.log(res.data);
        this.setState({
            cheatsheets: res.data
        });
    }


    // componentWillUpdate(){
    //     let selection = this.props.selection;
    //     let text = selection.toString();
    //     console.log(text);
    //     if(text.length>0){
    //         console.log("hereee");
    //         this.props.fromPopup(250,100,text);
    //         let range = selection.getRangeAt(0).cloneRange();
    //         if (range.getClientRects) {
    //             console.log(selection);
    //             range.collapse(true);
    //             let rects = range.getClientRects();
    //             console.log(rects);
    //             if (rects.length > 0) {
    //                 var rect = rects[0];
    //                 var x = rect.left;
    //             var y = rect.top;
    //             console.log(x,y,"x");
    //             }
    //         }
    //     }
    //}



    renderCheatSheets(){

        if(this.state.cheatsheets.length===0){
            return <div className='noCheatSheetMsg'>Please create a cheatsheet to directly add selected text.</div>
        }

        return this.state.cheatsheets.map((cheatsheet)=>{
            const id = cheatsheet._id;
            return (
                <div key={cheatsheet._id}>
                    <button className='cheatsheetBtn' onClick={(event)=>this.props.saveToCheatSheets(event, id)}> {cheatsheet.title}</button>
                    </div>
            )
        })
    }

    render(){

        if(this.state.cheatsheets===null){
            return <div>Loading...</div>
        }

        return(
        <div className="toolTipContainer">
            <span className="tooltiptext">copy to cheatsheet
            <div>{this.renderCheatSheets()}</div>
                {this.props.contentSaved && <div className='savedToCheatsheet'>Saved!</div>}
            </span>
        </div>
        );
    } 
}