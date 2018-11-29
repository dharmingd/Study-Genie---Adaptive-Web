import React, { Component } from "react";
import image from "../../study.png";
import signin from '../../signIn.png';
import {NavLink} from 'react-router-dom';
import "./landingPage.css";

class LandingPage extends Component {
  render() {
      return (
          <div className="page">
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
                  <br/><br/>
                  <div>
                      <a href="/auth/google"><img src={signin} className="signIn"/></a>
                  </div>
              </div>

          </div>

      );
  }
}

export default LandingPage;
