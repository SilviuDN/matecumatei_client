import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
import './Navigation.css'

import AuthService from '../../../services/auth.services'

const Navigation = ({ storeUser, loggedUser, handleAlert}) => {

    const authService = new AuthService()
    const history = useHistory()
    // console.log(history)

    const handleSignUp = () => {
        history.push('/signup');
    };

    const handleLogIn = () => {
        history.push('/login');
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
    }


    return (
        // ADDITIONAL_INFO
        // as putea adauga zIndex:10 --> ca sa nu mai apara video peste Navbar
        <Navbar bg="dark" variant="dark" expand="md" style={{ marginBottom: '0px', position: 'fixed', top: 0, width:'100%', zIndex:10 }}>
            <Link className="nav-link" to="/">
                <Navbar.Brand style={{color: 'rgba(255, 255, 255, 0.55)'}}>MateCuMatei - Idei, nu formule.</Navbar.Brand >
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end">
                <Nav className="mr-auto">
                    {/* <Link className="nav-link" to="/">Home</Link> */}
                    <Link className="nav-link" to="/courses">Cursuri{/*Courses*/}</Link>

                    {loggedUser && ( loggedUser.role === 'admin' || loggedUser.role === 'superUser' )
                    ?
                    <Link className="nav-link" to="/courses/new">Curs Nou{/*NewCourse*/}</Link>
                    :
                    null                    
                    }
                
                    {!loggedUser
                        ?
                        <>
                        <NavDropdown title="Contul meu" id="basic-nav-dropdown" align="end" className="d-none d-md-block">
                            <NavDropdown.Item onClick={handleLogIn}>Accesează cont</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleSignUp}>Crează cont</NavDropdown.Item>
                        </NavDropdown>
                        <Link className="nav-link d-md-none" to="/signup">Crează cont</Link>
                        <Link className="nav-link d-md-none" to="/login">Accesează cont</Link>
                        </>
                        :
                        <>
                            <span className="nav-link" onClick = { () => logout()}>LogOut</span>
                            <Link className="nav-link" to={`/users/${loggedUser._id}`}>Profilul Meu</Link>
                            <span className="nav-link" >Salutare{loggedUser ? ', '+loggedUser.username?.trim().split(' ')[0] : ''}!</span>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
}

export default Navigation