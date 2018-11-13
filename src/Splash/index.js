import React, { Component } from 'react';
import SignUp from '../SignUp';

class Splash extends Component {
  state = {
    images: ["https://images.unsplash.com/photo-1484991227236-56123ab16e60?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cbc13fda8b39ec152c0ebf23bb0a5932&auto=format&fit=crop&w=2550&q=80", "https://images.unsplash.com/photo-1519070543065-ac1764985512?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=832b931997e9f544454a77499e00ef0a&auto=format&fit=crop&w=2316&q=80", "https://images.unsplash.com/photo-1466500419182-8602dc906b51?ixlib=rb-0.3.5&s=bb26969baadc7c1478d340b272383cfc&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=794691cc020e7d15205ebc98a675117a&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af9c4cfbc245991849b8cacabacd34ff&auto=format&fit=crop&w=1950&q=80"],
    height: "25%"
  }

  // handleClickSignUp = e => {
  //   this.setState({
  //     visible: !this.state.visible
  //   });
  // }

  slides = () => {
    return this.state.images.map((image, idx) => (
      <div key={"image" + idx} className={"carousel-item " + (idx === 0 ? "active" : "")}>
        {/* <img src={image} alt="First slide" /> */}
        <div style={{background:`url(${image})50% 50%`, backgroundSize:"cover", width:"100vw", height:"100vh"}}></div>
      </div>
    ))
  }

  render() {
    return (
      <div className="container-fluid" style={{paddingLeft:"0"}}>
          <div id="carousel" className="carousel slide" data-ride="carousel" data-interval="7000" data-pause="false" style={{position:"fixed", top: "0", minHeight:"10%"}}>
            <div className="carousel-inner">
              {this.slides()}
            </div>
          </div>
          <div id="splash-bottom" className="container-fluid pt-3 pl-4" style={{position:"absolute", display:"block", bottom:"0", marginBottom: "0px", height: `${this.props.visibleSplash ? "91%" : "25%"}`, width:"100vw", boxShadow: "rgb(0, 0, 0, .5) 1px 7px 5px -6px inset", transition:"height 500ms ease-in", overflowY:"scroll"}}>
            <div className="splash-text">
            <h1 className="display-4 text-primary" style={{fontFamily: "'Bree Serif', serif"}}>Here's the rundown.<small className="text-muted"><em></em></small></h1>
            <p className="lead"><em>We're a social blogging platform built for creators, by creators. Tell your story. Show your latest photoshoot. Drop that mixtape. Meet new friends.</em></p>
            <div className="pr-2" style={{    display: "inline-block",
    float: "right"}}>
                <h4 onClick={this.props.handleVisibleSplash} style={{fontWeight:"bold", cursor:"pointer", position: "relative"}}>Get started now <i className="fas fa-arrow-up text-primary ml-2" style={{transform:`rotate(${this.props.visibleSplash ? 180 : 0}deg)`,transition: "transform 500ms ease"}}></i></h4>
            </div>
            {this.props.visibleSplash ? <SignUp logIn={this.props.logIn}/> : null}
          </div>
          </div>
        </div>
    );
  }

}

export default Splash;