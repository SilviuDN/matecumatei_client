import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container } from 'react-bootstrap';
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
    const cartListFromStorage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
    const cartFromStorage = { 
      cartItems: cartListFromStorage, 
      itemsCount: cartListFromStorage.length, 
      total: cartListFromStorage.reduce((acc, curr) => acc + curr.price, 0), 
      };    
    // const cartFromStorage = localStorage.getItem('cart')
    //   ? JSON.parse(localStorage.getItem('cart'))
    //   : { cartItems: [], itemsCount: 0, total: 0, couponCode: undefined };
    this.state = { 
      loggedUser: undefined,
      toast:{
        showAlert: false,
        alertText: [],
        displayTime: 0,
        color: 'warning'
      },
      cart: cartFromStorage,
      // cart:{
      //   cartItems:[],
      //   itemsCount: 0,
      //   total: 0,
      //   couponCode: undefined,
      // },
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
      .then( () => {
        const cartFromStorage = localStorage.getItem('cart') ? 
          JSON.parse(localStorage.getItem('cart')) : [];
        this.addCoursesToCart(cartFromStorage)
      })
      .catch(() => this.storeUser(undefined));
  };

  storeCartItems = (cartItems) => {
    const cart = cartItems.length > 0 ? cartItems : [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart = (course) => {
    const tempCartItems = [...this.state.cart.cartItems, course]
    const updatedCart = {
      ...this.state.cart,
      cartItems: tempCartItems,
      itemsCount: tempCartItems.length,
      total: tempCartItems.reduce((acc, curr) => acc + curr.price, 0),
    };
    this.storeCartItems(tempCartItems)
    this.setState({ cart: updatedCart });
  }

  addCoursesToCart = (tempCartItems) => {
    const updatedCart = {
      ...this.state.cart,
      cartItems: tempCartItems,
      itemsCount: tempCartItems.length,
      total: tempCartItems.reduce((acc, curr) => acc + curr.price, 0),
    };
    this.storeCartItems(tempCartItems)
    this.setState({ cart: updatedCart });
  }

  removeItem = (id) => {
    const tempCartItems = [...this.state.cart.cartItems].filter( el => el._id !== id)
    const updatedCart = {
      ...this.state.cart,
      cartItems: tempCartItems,
      itemsCount: tempCartItems.length,
      total: tempCartItems.reduce((acc, curr) => acc + curr.price, 0),
    };
    this.storeCartItems(tempCartItems)
    this.setState({ cart: updatedCart });
  }

  removeAllItems = () => {
    const updatedCart = {
      ...this.state.cart,
      cartItems: [],
      itemsCount: 0,
      total: 0,
      couponCode: undefined,
    };
    localStorage.removeItem('cart')
    this.storeCartItems([])
    this.setState({ cart: updatedCart });
    // this.props.history.push('/courses');
  }

  // Handle Cookies
  // showCookiesSettings = () => {
  //   this.setState({ showCookiesSettings: true });
  // }  
  // hideCookiesSettings = () => {
  //   this.setState({ showCookiesSettings: false });
  // }
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
          itemsCount = {this.state.cart.itemsCount}
          // redirectToCourses={this.redirectToCourses}
        />

        <div style={{paddingTop:'3.5em', paddingBottom:'0', marginBottom:'0', minHeight:'100vh'}} >

          <Routes
            handleAlert={this.handleAlert}
            storeUser={this.storeUser}
            loggedUser={this.state.loggedUser}
            addToCart={this.addToCart}
            removeItem={this.removeItem}
            removeAllItems={this.removeAllItems}
            cart={this.state.cart}
          />          
        </div>

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
         
        {/* <CookieGDRP show={this.state.showGDRP} onHide={this.hideGDRP} /> */}

       
      </>
    );
  }
}

export default App;
