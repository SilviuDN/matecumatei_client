import './CoursePage.css';

import { Col, Button} from "react-bootstrap";
import {Link} from 'react-router-dom'
// import classes from './CoursePage.css'


const CourseCard = ({name, image, price, discountedPrice, coupons, about, 
        description, _id, reviews, loggedUser, skillLevel, lecturesNumber, totalTimeInSeconds, addToCart, removeItem}) => {
    // const shortDescription = description[0].slice(0, 70)
    const shortDescription = about.slice(0, 70)
    const course = {name, image, price, discountedPrice, coupons, _id}

    const isInCart = JSON.parse(localStorage.getItem('cart')).find( el => el._id === _id)

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
                    <Button className="btnBlock mb-2" variant="info">Detalii</Button>
                </Link>

            {/* ADD TO CART / REMOVE FROM CART */}
                {/* {
                    isInCart
                    ?
                    <Button className='btnBlock mb-2 removeButton' onClick={() => removeItem(_id)}>Elimină din coș</Button>
                    :
                    <Button className="btnBlock mb-2" variant="secondary" onClick={() => addToCart(course)}>Adaugă în coș</Button>
                } */}

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