import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css'

import Routes from './Routes';
import Navigation from './layout/Navigation/Navigation';
import Footer from './layout/Footer/Footer';
import AuthService from '../services/auth.services';
import Alert from './shared/Alert';

import CookieGDRP from './pages/CookiesSettings/CookieInfoGDRP';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      loggedUser: undefined,
      toast:{
        showAlert: false,
        alertText: [],
        displayTime: 0,
        color: 'warning'
      },
      // showGDRP: true,
      // showCookiesSettings: true,
      showGDRP: true,
    };
    this.authService = new AuthService();
  }

  storeUser = (loggedUser) => {
    this.setState({ loggedUser });
  };

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then((theLoggedUser) => this.storeUser(theLoggedUser.data))
      .catch(() => this.storeUser(undefined));
  };

  // Handle Cookies
  showCookiesSettings = () => {
    this.setState({ showCookiesSettings: true });
  }  
  hideCookiesSettings = () => {
    this.setState({ showCookiesSettings: false });
  }
  hideGDRP = () => {
    this.setState({ showGDRP: false });
  }
  


  handleAlert = (alertText, displayTime = 3000, color='warning', showAlert = true) => {
    // console.log(alertText, displayTime, color, showAlert)
    this.setState({toast: {...this.state.toast, alertText, displayTime, color, showAlert }});
  };

  componentDidMount() {
    this.fetchUser();
    // window.scrollTo(0, 0)
  }
  
  render() {
    return (
      <>
        <Navigation
          handleAlert={this.handleAlert}
          storeUser={this.storeUser}
          loggedUser={this.state.loggedUser}
          redirectToCourses={this.redirectToCourses}
        />

        <Routes
          handleAlert={this.handleAlert}
          storeUser={this.storeUser}
          loggedUser={this.state.loggedUser}
        />

        <Footer />

        <Alert
          handleAlert={this.handleAlert}
          show={this.state.toast.showAlert}
          text={this.state.toast.alertText}
          displayTime={this.state.toast.displayTime}
          color={this.state.toast.color}
        />

        <CookieGDRP show={this.state.showGDRP} onHide={this.hideGDRP} />
         


        {/* <CookieConsentComponent show={this.state.showGDRP} showCookiesSettings={this.showCookiesSettings}/>
        
        <CookieSettingsModal show={this.state.showCookiesSettings} onHide={this.hideCookiesSettings} /> */}
         
        <CookieGDRP show={this.state.showGDRP} onHide={this.hideGDRP} />

       
      </>
    );
  }
}

export default App;
