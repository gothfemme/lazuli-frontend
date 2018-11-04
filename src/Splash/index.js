import React, { Component } from 'react';

class Splash extends Component {
  state = {
    images: ["https://images.unsplash.com/photo-1484991227236-56123ab16e60?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cbc13fda8b39ec152c0ebf23bb0a5932&auto=format&fit=crop&w=2550&q=80", "https://images.unsplash.com/photo-1519070543065-ac1764985512?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=832b931997e9f544454a77499e00ef0a&auto=format&fit=crop&w=2316&q=80", "https://images.unsplash.com/photo-1466500419182-8602dc906b51?ixlib=rb-0.3.5&s=bb26969baadc7c1478d340b272383cfc&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=794691cc020e7d15205ebc98a675117a&auto=format&fit=crop&w=1950&q=80", "https://images.unsplash.com/photo-1446329813274-7c9036bd9a1f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=af9c4cfbc245991849b8cacabacd34ff&auto=format&fit=crop&w=1950&q=80"],
    current: 0
  }

  componentDidMount() {
    setInterval(this.mover, 10000)
  }

  mover = () => {
    this.setState({ ...this.state,
      current: (this.state.current < this.state.images.length - 1 ? this.state.current + 1 : 0)
    });
  }

  slides = () => {
    return this.state.images.map((image, idx) => (
      <div className={"carousel-item " + (idx === 0 ? "active" : "")}>
        <img className="d-block w-100 h-100" src={image} alt="First slide" />
      </div>
    ))
  }

  render() {
    return (
      <div className="container-flud">
          <div id="carousel" className="carousel slide" data-ride="carousel" data-interval="7000" data-pause="false" style={{position:"fixed", top: "0"}}>
            <div className="carousel-inner">
              {this.slides()}
            </div>
          </div>
          <div id="splash-bottom" className="container-fluid pt-3 pl-4" style={{position:"fixed", display:"block", bottom: "0", height:"25%", width:"100vw", boxShadow: "inset 1px 7px 10px -6px rgb(0, 0, 0, 1)"}}>
            <div class="splash-text">
            <h1 className="display-4" style={{  fontFamily: "'Bree Serif', serif"}}>Here's the rundown.<small className="text-muted"><em></em></small></h1>
            <p className="lead"><em>We're a social blogging platform built for creators, by creators. Tell your story. Show your latest photoshoot. Drop that mixtape. Meet new friends.</em></p>
            <div className="text-right pr-2">
                <p className="lead" style={{fontWeight:"bold"}}>Get started now <i class="fas fa-arrow-right text-primary ml-2"></i></p>
            </div>
          </div>
          </div>
        </div>
    );
  }

}

export default Splash;