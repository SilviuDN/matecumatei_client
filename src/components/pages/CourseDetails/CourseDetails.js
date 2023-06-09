import { Component } from "react";
import CoursesService from "../../../services/courses.services";
import SectionsList from "../SectionPage/SectionsList";
import Spinner from './../../shared/Spinner'
import SectionForm from "../SectionForm/SectionForm";
import classes from '../SectionPage/SectionPage.module.css';
import classes2 from './CourseDetails.module.css';

import { Row, Col} from 'react-bootstrap'
// import {Link} from 'react-router-dom'
import CourseTabs from "./CourseTabs";
import CourseHeader from "./CourseHeader";
import LectureVideo from "../LecturePage/LectureVideo";



class CourseDetails extends Component{

    constructor(){
        super()
        this.state = {
            course: undefined,
            // showSections: false,
            // currentSection: 3, // removable?
            // currentLecture: 1, // removable?
            currentVideo: undefined,
            newSectionFormIsShown: false,
        }
        this.courseService = new CoursesService()
    }

    loadDetailsPage(){
        const {course_id} = this.props.match.params
        this.courseService
            .getCourse(course_id)
            .then( res => this.setState({course: res.data, currentVideo: res.data.currentVideo}))
            .catch( err => console.log(err))
    }

    // setCurrentSectionAndLecture is not used for now... 
    // setCurrentSectionAndLecture(sectionNumber, lectureNumber){
    //     this?.setState({currentSection: sectionNumber, currentLecture: lectureNumber})
    // }

    setCurrentVideo = (videoUrl) => {
        this.setState({currentVideo: videoUrl})
    }

    componentDidMount(){
        this.loadDetailsPage()
        // window.scrollTo(0, 0)
    }

    // componentDidUpdate = (prevProps, prevState) => prevState.currentVideo !== this.state.currentVideo && window.scrollTo(0, 0)

    // toggleShowSections = () => {
    //     this.setState({showSections: !this.state.showSections})
    // }

    // componentDidUpdate(prevProps, prevState){
    //     if( prevState.currentVideo !== this.state.currentVideo){
    //         // this.scrollIntoViewCurrentSection()
    //     }
    // }

    // renderList could be removed --> should update the page, but does not work
    renderList = () =>{
        this.loadDetailsPage()
    }

    toggleNewSectionForm = () => {
        this.setState({newSectionFormIsShown: !this.state.newSectionFormIsShown})
    }


    render(){

        return(
            !this.state.course
            ?
            <Spinner size={60}/>
            :
            <>
            <CourseHeader course = {this.state.course}/>
            <Row className="justify-content-around">
                <Col md={7} style={{marginBottom: '1em'}} className={classes2.stickyVideo}>
                    <LectureVideo videoUrl={this.state.currentVideo} style={{width:"100%", margin:0, padding:0}}/>
                    <hr/>

                    <div className="d-none d-sm-block" style={{marginBottom:'7em'}}>
                        <CourseTabs course={this.state.course} loggedUser={this.props.loggedUser} renderList={this.renderList}
                            setCurrentVideo={this.setCurrentVideo}/>
                    </div>

                </Col>

                <Col md={4}>
                    {/* <img src={this.state.course.image} alt={this.state.course.name} style={{ width: '100%' }} /> */}
                    {(!this.state.course.sections || this.state.course?.sections.length === 0)
                    ?
                    <>
                        <p>Todavia no hay sectiones...</p>
                        {
                            ( this.props.loggedUser?.role === 'admin' || this.state.course?.authors.includes(this.props.loggedUser?._id) ) &&
                            <div className={classes.block}>
        
                                <button className="btn btn-dark" onClick={this.toggleNewSectionForm}>
                                    Adauga Sectiune                     
                                </button>            
                            </div>
                        }
                        {
                            this.state.newSectionFormIsShown && 
                            <SectionForm courseId={this.state.course._id} hideForm={this.toggleNewSectionForm} renderList={this.renderList}/>
                        }
                    </>
                    
                    :
                    <>
                    {
                        this.props.loggedUser?.role === 'admin' || this.props.loggedUser?.courses.includes(this.state.course._id) 
                            || ( this.props.loggedUser !== undefined && this.state.course.freeAccessForAllLectures)
                        ?
                        <h5>Continutul cursului:</h5>
                        :
                        <h5>Continut cu acces liber:</h5>
                    }
                    {/* <CourseHeader course={{name: 'Continut cu acces liber:'}}/> */}
                    <SectionsList courseId={this.state.course._id} 
                        freeCourse={this.state.course.freeAccessForAllLectures} 
                        lecturesCount={this.state.course.lectures.length} 
                        sections={this.state.course?.sections}  
                        loggedUser={this.props.loggedUser} 
                        renderList={this.renderList} 
                        currentLecture={this.state.currentLecture} 
                        // setCurrentSectionAndLecture={this.setCurrentSectionAndLecture}
                        currentSection={this.state.currentSection}
                        setCurrentVideo={this.setCurrentVideo}
                        currentVideo={this.state.currentVideo}/>
                    </>
                    }
                </Col>
            </Row>

            
            </>

        )
    }

}

export default CourseDetails