import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Portfolio from './Components/Portfolio';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AboutPage from './pages/about/about';
import ResumePage from './pages/resume/resume';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-110570651-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'./resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
    
    let viewName = 'home';
    let adobe = window['adobe'];
 
    // Validate if the Target Libraries are available on your website
    if (typeof adobe != 'undefined' && adobe.target && typeof adobe.target.triggerView === 'function') {
      adobe.target.triggerView(viewName);
    }
  }

  render() {
    return (
      <Router className="app">
        <Header data={this.state.resumeData.main} />
        <Switch>
          <Route path="/aboutus">
            <AboutPage></AboutPage>
          </Route>
          <Route path="/resume">
            <ResumePage></ResumePage>
          </Route>
          <Route path="/">
        
            <Portfolio data={this.state.resumeData.portfolio} />
          </Route>
        </Switch>
                <Footer data={this.state.resumeData.main} />
      </Router>
    );
  }
}

export default App;
