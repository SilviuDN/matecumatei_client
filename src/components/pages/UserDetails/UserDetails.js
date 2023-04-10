import { Component } from "react";
import UsersService from "../../../services/users.services";
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

class UserDetails extends Component{
    constructor(){
        super()
        this.state = {
            user: undefined,
        }
        this.userService = new UsersService()
    }

    componentDidMount(){
        const { userId } = this.props.match.params
        this.userService
            .getUser(userId)
            .then(response => {
                this.setState({
                    user: response.data,
                })
            })
            .catch(err => {
                console.log('Hey', err)
                this.props.handleAlert(['You should login to access this route.'], 5000, 'info')
                this.props.history.push('/login')
            })
    }

    render(){
        const { user } = this.state;

        if (!user) {
          return <div>Loading...</div>;
        }

        return(
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Header>{user.name} {user.surname}</Card.Header>
                        <Card.Body>
                            <Image src={user.avatar} roundedCircle />
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Pseudonim:</strong> {user.username}</p>
                                <p><strong>Prenume:</strong> {user.name}</p>
                                <p><strong>Nume de familie:</strong> {user.username}</p>
                            <Link className="nav-link" to={`/users/${user._id}/edit`}>
                                <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Edit User</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
            </Container>
          
        )
    }


}

export default UserDetails