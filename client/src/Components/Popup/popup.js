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
        if(selection.toString().length>0){
            let range = selection.getRangeAt(0).cloneRange();
            if (range.getClientRects) {
                range.collapse(true);
                let rects = range.getClientRects();
                if (rects.length > 0) {
                    var rect = rects[0];
                }
                var x = rect.left;
                var y = rect.top;
                console.log(x,y,"x");
                this.props.fromPopup(x,y);
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