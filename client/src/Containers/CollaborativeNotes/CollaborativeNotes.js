import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';


export default class CollaborativeNotes extends Component {

    constructor(props){
        super(props);
        this.state = {data: {
            labels: ["Java", "React", "Mongo", "Python", "Adaptive Web", "Node", "Redux"],
            datasets: [{
            label: "Number of notes",
            backgroundColor: 'rgb(118,215,196)',
            borderColor: 'rgb(255, 99, 132)',
            data: [2, 4, 5, 6, 10, 5, 9],
            }]
        }, options:{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }}
    }

    componentDidMount(){
        console.log("here");
    }

    render(){
        return(
            <div>
                <Bar data={this.state.data} options={this.state.options} />
            </div>
            
        );
    }
}