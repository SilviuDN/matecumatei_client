import './CoursePage.css';

import { Col, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'


const CourseCard = ({name, about, description, image, _id, reviews, loggedUser, skillLevel, lecturesNumber, totalTimeInSeconds}) => {
    // const shortDescription = description[0].slice(0, 70)
    const shortDescription = about.slice(0, 70)

    return(
        <Col md={6} xl={4}>
            <article className="courseCard">
                <Link to={`/courses/details/${_id}`} className='courseCardLink'>
                    <img src={image} alt={name}/>
                    <h4>{name}</h4>
                    <p>Skill level: {skillLevel} | Lectures: {lecturesNumber}</p>
                    {/* <p>Lectures: {lecturesNumber}</p> */}
                    {/* <p>Total video duration: {totalTimeInSeconds} ore</p> */}
                    <p>{shortDescription}...</p>
                    <Button className="btnBlock" variant="secondary">Detalii</Button>
                </Link>
                {
                loggedUser && loggedUser.role === 'admin'
                ?
                <Link to={`/courses/edit/${_id}/false`}>
                    <Button className="btnBlock" variant="warning">Edit</Button>
                </Link>
                :
                null
                }
            </article>
        </Col>
    )

}

export default CourseCard