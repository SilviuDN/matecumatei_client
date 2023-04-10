// import { Component } from 'react'
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// // import 'bootstrap-icons/font/bootstrap-icons.css'


// import Routes from './Routes'
// import Navigation from './layout/Navigation/Navigation'
// import Footer from './layout/Footer/Footer'
// import AuthService from '../services/auth.services'
// import Alert from './shared/Alert'

// import CookieConsent from 'react-cookie-consent'
// import Cookies from 'js-cookie';

// class App extends Component {

//   constructor() {
//     super()
//     this.state = { 
//       loggedUser: undefined,
//       toast:{
//         showAlert: false,
//         alertText: [],
//         displayTime: 0,
//         color: 'warning'
//       },
//       cookiesSetingsL{
//         showCookieSettings: false,
//         preferencesCookies: false,
//         analyticsCookies: false,
//         marketingCookies: false,
//       }
//     }
//     this.authService = new AuthService()
//   }

//   storeUser = loggedUser => {this.setState({ loggedUser })}

//   fetchUser = () => {
//     this.authService
//       .isLoggedIn()
//       .then(theLoggedUser => this.storeUser(theLoggedUser.data))
//       .catch(() => this.storeUser(undefined))
//   }

//   handleAlert(alertText, displayTime = 3000, color='warning', showAlert = true) {
//     // console.log(alertText, displayTime, color, showAlert)
//     this.setState({toast: {...this.state.toast, alertText, displayTime, color, showAlert }})
//   }

//   componentDidMount = () => {
//     this.fetchUser()
//     // window.scrollTo(0, 0)
//   }
  

//   render() {


//     return (
//       <>
//         <Navigation handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
//           storeUser={this.storeUser} loggedUser={this.state.loggedUser} 
//           redirectToCourses={this.redirectToCourses}/>

//         <Routes handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
//           storeUser={this.storeUser} loggedUser={this.state.loggedUser} />

//         <Footer />
        
//         <Alert handleAlert={(alertText, displayTime, color, showAlert) => this.handleAlert(alertText, displayTime, color, showAlert)} 
//           show={this.state.toast.showAlert} text={this.state.toast.alertText} 
//           displayTime={this.state.toast.displayTime} color={this.state.toast.color}/>

//         <CookieConsent 
//           debug={true}
//           location={'bottom'}
//           style={{ background: '#000', textAlign: 'left'}}
//           buttonStyle={{ color: '#000', background: '#ffb606', fontSize:'1.2em'}}
//           buttonText='Accept toate'
//           expires={365}
//           >
//             <h6>Nouă ne pasă ca datele tale personale să rămână confidențiale</h6>
//             <p>Folosim cookie-uri pe site-ul nostru pentru a vă oferi cea mai relevantă experiență. 
//               Pentru aceasta stocăm informații despre preferințele și vizitele repetate. 
//               Făcând clic pe „Accept toate”, sunteți de acord cu utilizarea TUTUROR cookie-urile. 
//               Cu toate acestea, puteți accesa „Setări cookies” pentru a oferi un consimțământ controlat.
//             </p>
//             <button
//               style={{ color: '#000', background: '#fff', fontSize: '1.2em' }}
//               onClick={() => {
//                 // TODO: add code to show cookie settings modal
//               }}
//             >
//               Setari cookies
//             </button>
//         </CookieConsent>
//       </>
//     )
//   }
// }

// export default App;
