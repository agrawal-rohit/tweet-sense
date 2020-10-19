import React, { Component } from "react";
import './App.css';
import Chart from 'react-apexcharts'

const axios = require('axios');
var ProgressBar = require('progressbar.js');

class App extends Component {
    constructor(){
        super();
        this.state = {
            hashtag: "",
            submitted: false,
            progressBar: false,
            options: {
                colors: ['#F7464A', '#46BFBD', '#FDB45C'],
                labels: ['Negative', 'Positive', 'Neutral'],
                plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true
                    }
                  }
                }
              }
            },
            series: [44, 55, 41],
            tweets: [],
            hashtag_desc: ""
        }
    }
    
    async componentDidUpdate() {
      var positive = 0
        var negative = 0
        var neutral = 0
        var self = this;
        try {        
          setInterval(async () => {
          axios.get('http://localhost:8000/analyzehashtag', {
              params: {
                  text: this.state.hashtag
              }
          }).then(function(response) {
              negative = response.data.negative
              positive = response.data.positive
              neutral = response.data.neutral
              self.setState({submitted: true});
              self.setState({series: [negative, positive, neutral]});
          });
              }, 30000);
          } catch(e) {
            console.log(e);
          }
        
        try {        
          setInterval(async () => {
          axios.get('http://localhost:8000/gettweets', {
              params: {
                  text: this.state.hashtag
              }
          }).then(function(response) {
              console.log(response);
              self.setState({tweets: response.data.results});
          });
              }, 30000);
          } catch(e) {
            console.log(e);
          }
      }
    
    submitHandler = () => {
        this.setState({progressBar: true});
        this.setState({submitted: false});
        var positive = 0
        var negative = 0
        var neutral = 0
        var self = this;
        try {        
          axios.get('http://localhost:8000/analyzehashtag', {
              params: {
                  text: this.state.hashtag
              }
          }).then(function(response) {
              negative = response.data.negative
              positive = response.data.positive
              neutral = response.data.neutral
              self.setState({submitted: true});
              self.setState({progressBar: false});
              self.setState({series: [negative, positive, neutral]});
          });
          } catch(e) {
            console.log(e);
          }
        
        try {        
        var url = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=" + this.state.hashtag + "&limit=1&format=json"
          axios.get(url).then(function(response) {
              self.setState({hashtag_desc: response.data[2][0]});
          });
          } catch(e) {
            console.log(e);
          }
        
        try {        
          axios.get('http://localhost:8000/gettweets', {
              params: {
                  text: this.state.hashtag
              }
          }).then(function(response) {
              self.setState({tweets: response.data.results});
          });
          } catch(e) {
            console.log(e);
          }
        
    }
    
    inputHandler = (e) => {
        this.setState({hashtag: e.target.value});
    }
    
    showAnalysis = () => {
        if(this.state.submitted == true){
            return(
                <div class="row">
                <div class="col-sm-4">
                    <Chart options={this.state.options} series={this.state.series} type="donut" width="420" />
                </div>
                <div class="offset-sm-1 col-sm-7">
                <h1 class="heading_desc">{this.state.hashtag_desc}</h1>
                <br /><br />
                </div>
                </div>  
            );
        }
    }
    
    showLoadingBar = () => {
        if(this.state.progressBar){
            return(
                <div class="text-center">
                    <img src={require('./loading_bar.gif')} width="50"/>
                    <h2 class="progressheader">Please Wait</h2>
                </div>
            );
        }
    }
        
    render() {
        
        var renderTweets = this.state.tweets.map(function(item, i){
            var color = "#46BFBD";
            
            if(item.label == "Neutral"){
                color = "#FDB45C";
            }
            if(item.label == "Negative"){
                color = "#F7464A";
            }
              return (
                    <div key={i} class="tweets">
                    <h2>@{item.username}</h2>
                    <p>{item.text}</p>
                    <h3 style={{"color": color}}>Predicted Sentiment - {item.label}</h3>
                    </div>
                  );
            })
        
  return (
      <div>
          <div class="container">
              <h1 class="display-4 text-center" style={{'margin-top':this.state.submitted?'5%':'30%'}}>Twitter Sentiment Analysis</h1>
              <br /><br />
                <div class="input-group mb-3">
                 <div class="input-group-prepend">
                    <span class="input-group-text hashtag-icon" id="basic-addon1">#</span>
                  </div>
                  <input type="text" class="form-control hashtag" id="basic-url" aria-describedby="basic-addon3" placeholder="Enter Hashtag to analyze" onChange={this.inputHandler}/>
              </div>
              <br />
              <div class="row">
                  <div class="col-sm-12">
                    <div class="text-center">
                      <button class="btn text-center btn-outline-secondary submit" type="button" onClick={this.submitHandler}>Analyze</button>
                    </div>
                  </div>
                </div>
                <br /><br /><br /><br />
                {this.showAnalysis()}
              {this.state.submitted?renderTweets:<br />}
                {this.showLoadingBar()}
          </div>
          <div class="footer my-auto">
              <p>Made with <h1 class="fa fa-heart" style={{"color": "#00aced"}}></h1> by Rohit Agrawal (<a href="https://github.com/agrawal-rohit">Github</a>)</p>
          </div>
      </div>
  );
}
}
export default App;
