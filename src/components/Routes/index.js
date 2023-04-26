import { Switch, Route } from 'react-router';

import IndexPage from './../pages/IndexPage/IndexPage';
import CoursesPage from './../pages/CoursesPage/CoursesPage';
import CourseDetails from '../pages/CourseDetails/CourseDetails';
import CourseForm from '../pages/CourseForm/CourseForm';
import CourseEditForm from '../pages/CourseForm/CourseEditForm';
import Signup from '../pages/SignUp/SignUp';
import LogIn from '../pages/LogIn/LogIn';
import UserDetails from '../pages/UserDetails/UserDetails';
import UserEditForm from '../pages/UserDetails/UserEditForm';

const Routes = ({ storeUser, loggedUser, handleAlert }) => {

    return(
        <>
            <Switch>
                <Route path = '/' exact render = { () => <IndexPage loggedUser={loggedUser}/> } />

                <Route path = '/courses' exact render = { () => <CoursesPage loggedUser={loggedUser}/> } />
                <Route path = '/courses/details/:course_id' render = { props => <CourseDetails {...props} loggedUser={loggedUser}/> } />
                <Route path = '/courses/new' render = { (props) => <CourseForm {...props} loggedUser={loggedUser}/> } />
                <Route path = '/courses/edit/:course_id/:populated' render = { (props) => <CourseEditForm {...props} loggedUser={loggedUser}/> } />

                <Route path = '/signUp' render = { (props) => <Signup {...props} handleAlert={handleAlert} /> } />
                <Route path = '/logIn' render = { (props) => <LogIn {...props} storeUser={storeUser} handleAlert={handleAlert}/> } />

                <Route path = '/users/:userId/edit'  render = { (props) => loggedUser ? <UserEditForm {...props} handleAlert={handleAlert}/> : <CoursesPage loggedUser={loggedUser}/> } />
                <Route path = '/users/:userId'  render = { (props) => loggedUser ?  <UserDetails {...props} handleAlert={handleAlert}/> : <CoursesPage loggedUser={loggedUser}/> } />
            </Switch>
        </>        
    )
}

export default Routes