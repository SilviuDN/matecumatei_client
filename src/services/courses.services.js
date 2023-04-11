import axios from 'axios' 
 
 class CoursesService{

    constructor(){
        this.app = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL + '/courses',
            // baseURL: 'https://matecumatei-server.herokuapp.com/api/courses',
            // baseURL: 'http://localhost:5000/api/courses',
            withCredentials: true
        })
    }

    getAllCourses = () => this.app.get('/')
    getCourse = (courseId, populated) => this.app.get(`/${courseId}/${populated}`)
    // getCourse = courseId => this.app.get(`/${courseId}`)
    saveCourse = (course_info) => this.app.post('/new', course_info)
    editCourse = (course_info) => this.app.put(`/edit/${course_info._id}`, course_info)
 }

 export default CoursesService