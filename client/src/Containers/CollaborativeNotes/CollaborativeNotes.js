import React, { Component } from "react";
import {Bar, Pie} from 'react-chartjs-2';


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
        }, piedata: {
            labels: [
                'Ashni',
                'Malay',
                'Maitreyi', 'Meet','Darsh','Ayan','Sushrut','Dharmin','Jay','Hote'
            ],
            datasets: [{
                data: [300, 50, 100,20,30,10,40,90,35,55],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#8080ff',
                '#ff809f',
                '#dfff80',
                '#ffbf80',
                '#80ffdf',
                '#ff8080',
                '#e6ff99'
                
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ]
            }]
        }}
    }

    componentDidMount(){
        console.log("here");
    }

    render(){
        return(
            <div>
                <div>
                    <Bar data={this.state.data} options={this.state.options} />
                </div>
                <div>
                    <Pie data={this.state.piedata}/>
                </div>
                
            </div>
            
        );
    }
}