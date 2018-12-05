import React from 'react';
import './popup.css';

export default class Popup extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillUpdate(){
        let selection = this.props.selection;
        let text = selection.toString();
        console.log(text);
        if(text.length>0){
            console.log("hereee");
            this.props.fromPopup(250,100,text);
            let range = selection.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                console.log(selection);
                range.collapse(true);
                let rects = range.getClientRects();
                console.log(rects);
                if (rects.length > 0) {
                    var rect = rects[0];
                    var x = rect.left;
                var y = rect.top;
                console.log(x,y,"x");
                
                }
                
            } 
        }
    
    }
    render(){
        return(
        <div className="toolTipContainer">
            <span className="tooltiptext">copy</span>
        </div>
        );
    } 
}