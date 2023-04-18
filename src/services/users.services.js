import axios from 'axios' 
 
 class UsersService{

    constructor(){
        this.app = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL + '/users',
            // baseURL: 'https://matecumatei-server.herokuapp.com/api/users',
            // baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    // getAllUsers = () => this.app.get('/')
    getUser = userId => this.app.get(`/${userId}`)
    // saveUser = (user_info) => this.app.post('/new', user_info)
    editUser = (user, changePassword) => this.app.put(`/edit/${user._id}`, {user, changePassword})
 }

 export default UsersService