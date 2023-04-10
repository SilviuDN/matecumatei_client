import './CoursePage.css';

import { Col, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'


const CourseCard = ({name, description, image, _id, reviews, loggedUser}) => {

    return(
        <Col sm={6} lg={4}>
            <article className="courseCard">
                <img src={image} alt={name}/>
                <h4>{name}</h4>
                <p>{description.slice(0, 70)}...</p>
                <Link to={`/courses/details/${_id}`}>
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