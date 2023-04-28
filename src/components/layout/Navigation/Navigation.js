import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import './Navigation.css'
import CartIcon from '../../pages/Cart/CartIcon'

import AuthService from '../../../services/auth.services'

const Navigation = ({ storeUser, loggedUser, handleAlert, itemsCount}) => {

    const authService = new AuthService()
    const history = useHistory()
    // console.log(history)

    const handleSignUp = () => {
        history.push('/signup');
    };

    const handleLogIn = () => {
        history.push('/login');
    };

    const handleMenuClick = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');

        if (navbarToggler && navbarCollapse) {
            // navbarToggler.classList.toggle('collapsed');
            // navbarCollapse.classList.toggle('show');
            navbarToggler.classList.add('collapsed');
            navbarCollapse.classList.remove('show');
        }
    };

    const logout = () => {
        authService
            .logout()
            .then((res) => {
                storeUser(undefined)
                history.push('/courses')
                handleAlert(res.data.err, 5000, 'info')
            })
            .catch(err => {
                console.log(err)
                handleAlert(['There was an error at logout'], 3000, 'info')
                // storeUser(undefined)
                // history.push('/courses')
            })
            handleMenuClick()
    }


    return (
        // ADDITIONAL_INFO
        // as putea adauga zIndex:10 --> ca sa nu mai apara video peste Navbar
        <Navbar bg="dark" variant="dark" expand="md" style={{ marginBottom: '0px', position: 'fixed', top: 0, width:'100%', zIndex:10 }}>
            <Link className="nav-link" to="/">
                <Navbar.Brand style={{color: 'rgba(255, 255, 255, 0.55)'}} onClick={handleMenuClick}>MateCuMatei</Navbar.Brand >
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    {/* <Link className="nav-link" to="/">Home</Link> */}
                    <Link className="nav-link" to="/courses" onClick={handleMenuClick}>Cursuri{/*Courses*/}</Link>

                    {loggedUser && ( loggedUser.role === 'admin' || loggedUser.role === 'superUser' )
                    ?
                    <Link className="nav-link" to="/courses/new" onClick={handleMenuClick}>Curs Nou{/*NewCourse*/}</Link>
                    :
                    null                    
                    }
                
                    {!loggedUser
                        ?
                        <>
                        <NavDropdown title="Contul meu" id="basic-nav-dropdown" align="end" className="d-none d-md-block">
                            <NavDropdown.Item onClick={handleLogIn}>Log In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleSignUp}>Cont nou</NavDropdown.Item>
                        </NavDropdown>
                        <Link className="nav-link d-md-none" to="/login" onClick={handleMenuClick}>Log In{/*Accesează cont*/}</Link>
                        <Link className="nav-link d-md-none" to="/signup" onClick={handleMenuClick}>Cont nou{/*Creează cont*/}</Link>
                        </>
                        :
                        <>
                            <span className="nav-link" onClick = { () => logout()}>LogOut</span>
                            <Link className="nav-link" to={`/users/${loggedUser._id}`}  onClick={handleMenuClick}>Profilul Meu</Link>
                            <span className="nav-link" >Salutare{loggedUser ? ', '+loggedUser.username?.trim().split(' ')[0] : ''}!</span>
                        </>
                    }
                    {/* CART */}
                    {/* <Link className="nav-link" to="/cart"><CartIcon itemsCount={itemsCount}/></Link> */}
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Navigation