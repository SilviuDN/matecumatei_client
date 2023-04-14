import { Component } from "react";
import UsersService from "../../../services/users.services";
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

class UserEditForm extends Component{
    constructor(){
        super()
        this.state = {
            user: undefined,
            showNewPasswordFields: false,
        }
        this.userService = new UsersService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({user: {...this.state.user, [name]: value}})        
    }

    handleCheckboxChange = e => {
        const { name, checked } = e.target
        this.setState({[name]: checked})     
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.userService
            .editUser(this.state.user, this.state.showNewPasswordFields)
            .then( () => {
                console.log('ok')
                this.props.history.push(`/users/${this.state.user._id}`);
            })
            .catch( err => this.props.handleAlert(err.response.data.err, 10000, 'warning', true))

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
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const { user } = this.state;

        if (!user) {
          return <div>Loading...</div>;
        }

        return(
            <Container style={{marginBottom: '15em'}}>

                <Row>

                    <Col md={{ span: 4, offset: 4 }}>

                        <h1>Update my profile</h1>

                        <hr></hr>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group controlId="email">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control type="text" value={this.state.user.email} onChange={this.handleInputChange} name="email" />
                            </Form.Group>

                            <Form.Group controlId="username">
                                <Form.Label>Pseudonim*</Form.Label>
                                <Form.Control type="text" value={this.state.user.username} onChange={this.handleInputChange} name="username" />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Prenume</Form.Label>
                                <Form.Control type="text" value={this.state.user.name} onChange={this.handleInputChange} name="name" />
                            </Form.Group>

                            <Form.Group controlId="surname">
                                <Form.Label>Nume de familie</Form.Label>
                                <Form.Control type="text" value={this.state.user.surname} onChange={this.handleInputChange} name="surname" />
                            </Form.Group>

<hr/>
<Form.Group controlId="showNewPasswordFields">
    <Form.Check
        type="checkbox"
        checked={this.state.showNewPasswordFields}
        onChange={this.handleCheckboxChange}
        name="showNewPasswordFields"
        label="Change Password"
        inline
    />
</Form.Group>

                            
                            {this.state.showNewPasswordFields 
                            &&
                            <>
                            <hr/>
                                <Form.Label>In order to change the password, 
                                    <ul>
                                        <li>provide the current password</li>
                                        <li>introduce twice the new password</li>
                                    </ul>
                                </Form.Label>
                                <Form.Group controlId="pwd">
                                    <Form.Label>Current Password</Form.Label>
                                    <Form.Control type="password" value={this.state.user.pwd || ''} onChange={this.handleInputChange} name="pwd" />
                                </Form.Group>

                                <Form.Group controlId="pwdNew1">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" value={this.state.user.pwdNew1 || ''} onChange={this.handleInputChange} name="pwdNew1" />
                                </Form.Group>

                                <Form.Group controlId="pwdNew2">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="password" value={this.state.user.pwdNew2 || ''} onChange={this.handleInputChange} name="pwdNew2" />
                                </Form.Group>
                            </>
                            }



                            <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Update My Info</Button>

                        </Form>

                    </Col>
                </Row>

            </Container >
        )
    }


}

export default UserEditForm