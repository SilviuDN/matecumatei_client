import { useState, useEffect } from 'react'
import { Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap'
// import { Form, Button, Container, ListGroup, Row, Col, InputGroup } from 'react-bootstrap'
import CoursesService from '../../../services/courses.services'
import UploadsService from '../../../services/uploads.service'
// import DropDownArrow from './down-arrow-svgrepo-com.svg'
// import classes from './CourseForm.module.css'

const CourseEditForm = (props) =>  {

    const [courseInput, setCourseInput] = useState({
            name: '',
            description: '',
            typeOfCourse: 'video',
            position: 0,
            tags: [],
            price: 0,
            discountedPrice: 0,
            skillLevel: 'intermediate',
            language: 'română',
            allPlatformPromotions: [],
            freeAccessForFirstThirdOfAllLectures: true,
            image: '',
            owner: props.loggedUser?._id,
            authors: [props.loggedUser?._id],
            temporaryTag: '',
            addTagEnabled: true,
    })

    const coursesService = new CoursesService()
    const uploadsService = new UploadsService()

    useEffect(() => {   
        const coursesService2 = new CoursesService() 
        coursesService2
            .getCourse(props.match?.params.course_id, props.match?.params.populated)
            .then(response => {
                setCourseInput(prevCourseInput => ({
                    ...prevCourseInput,
                    ...response.data
                }));
                })
            .catch(err => console.log(err));
      }, [props.match?.params.course_id, props.match?.params.populated]);

    const handleInputChange = e => {
        const { name, value } = e.target

        // React SCHEDULES state updates, does not perform them instantly ==> if more updates scheduled, wrong state might be used
        // INSTEAD OF:

        // setCourseInput({
        //     ...courseInput,
        //     [name]: value
        // })

        // WE USE:

        setCourseInput((prevCourseInput) => {
            return { ...prevCourseInput, [name]: value }
        } )

        // and React GUARANTEES the latest state will be used

        // IF STATE UPDATE DEPENDS ON THE PREVIOUS STATE, USE THE ARROW FUNCTION
    }

    const handleCheckboxChange = e => {
        const { name, checked } = e.target

        setCourseInput((prevCourseInput) => {
            return { ...prevCourseInput, [name]: checked }
        } )
    }

    const addTag = (e) => {
        e.preventDefault()
        if( courseInput.temporaryTag.trim() !== ''){
            const tempTags = [...courseInput.tags, courseInput.temporaryTag]
            setCourseInput((prevCourseInput) => {
                return { ...prevCourseInput, tags: tempTags, temporaryTag: ''  }
            } )     
        }

    }


    const handleFormSubmit = e => {
        e.preventDefault()
        // console.log(courseInput)

        coursesService
            .editCourse(courseInput)
            .then(() => {
                // this.props.closeModal()
                // this.props.refreshCoasters()
                setCourseInput({
                    name: '',
                    description: '',
                    about: '',
                    temporaryTag: '',
                    tags: [],
                    typeOfCourse: 'video',
                    position: 0,
                    price: 100,
                    discountedPrice: 100,
                    skillLevel: 'intermediate',
                    language: 'română',
                    allPlatformPromotions: [],
                    freeAccessForFirstThirdOfAllLectures: false,
                    image: '',
                    owner:'',
                    authors:[],
                    addTagEnabled: true,
                })
                props.history.push('/courses')
            })
            .catch(err => console.log(err))
    }

    const handleFileUpload = e => {

        // this.setState({ loading: true })

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadsService
            .uploadImage(uploadData)
            .then(response => {
                setCourseInput((prevCourseInput) => {
                return { ...prevCourseInput, image: response.data.cloudinary_url }
            } )
                // this.setState({
                //     loading: false,
                //     coaster: { ...this.state.coaster, imageUrl: response.data.cloudinary_url }
                // })
            })
            .catch(err => console.log(err))
    }

        return (
            <Container>

                <Form onSubmit={handleFormSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={courseInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

                    <Form.Group controlId="about">
                        <Form.Label>About</Form.Label>
                        <Form.Control type="text" value={courseInput.about} onChange={handleInputChange} name="about" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={courseInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="NewCourseFormType">
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" type="text" value={courseInput.typeOfCourse} onChange={handleInputChange} name="typeOfCourse" custom="true">
                            <option value="">-- Select the course type --</option>
                            <option value="video">Video</option>
                            <option value="written">Written document - Pdf</option>
                            <option value="other">Other format</option>
                        </Form.Control>                     
                    </Form.Group>

                    {/* <Form.Group controlId="NewCourseFormType">
                        <Form.Label>Type</Form.Label>
                        <div className="input-group">
                            <Form.Control as="select" type="text" value={courseInput.typeOfCourse} onChange={handleInputChange} name="typeOfCourse" custom="true">
                                <option value="">-- Select the course type --</option>
                                <option value="video">Video</option>
                                <option value="written">Written document - Pdf</option>
                                <option value="other">Other format</option>
                            </Form.Control>
                            <div className="input-group-append">
                                <div className="input-group-text" style={{height:'100'}}>
                                    <div className={classes.smallPicContainer}>
                                        <img className={classes.smallPic} src={DropDownArrow} alt="DropDownArrow"/>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </Form.Group> */}

                    <Form.Group controlId="skillLevel">
                        <Form.Label>Skill Level</Form.Label>
                        <Form.Control as="select" type="text" value={courseInput.skillLevel} onChange={handleInputChange} name="skillLevel" custom="true">
                            <option value="">-- Select the skill level --</option>
                            <option value="beginner">Începător</option>
                            <option value="intermediate">Mediu</option>
                            <option value="expert">Avansat</option>
                        </Form.Control>                     
                    </Form.Group>

                    <Form.Group controlId="language">
                        <Form.Label>Language</Form.Label>
                        <Form.Control as="select" type="text" value={courseInput.language} onChange={handleInputChange} name="language" custom="true">
                            <option value="">-- Select the language --</option>
                            <option value="română">Română</option>
                            <option value="engleză">Engleză</option>
                            <option value="spaniolă">Spaniolă</option>
                        </Form.Control>                     
                    </Form.Group>

                    <Row style={{ alignItems: 'bottom' }}>
                        <Col xs={6} md={4}>
                            <Form.Group controlId="temporaryTag">
                                <Form.Label>Tags</Form.Label>
                                <Form.Control type="text" value={courseInput.temporaryTag} onChange={handleInputChange} name="temporaryTag" />
                            </Form.Group>
                        </Col>
                        <Col xs={6} md={2}>
                            <Button style={{ marginTop: '2em', width: '100%' }} variant="dark" onClick={addTag} disabled = {!courseInput.addTagEnabled}>
                                Add tag
                            </Button>
                        </Col>
                        <Col xs={12} md={6} style={{ marginTop: '1.8em'}}>
                            <ListGroup horizontal>
                                {courseInput.tags.map( tag => <ListGroup.Item>{tag}</ListGroup.Item>)}
                            </ListGroup>
                        </Col>
                    </Row>

                    <Form.Group controlId="lng">
                        <Form.Label>Position</Form.Label>
                        <Form.Control type="number" value={courseInput.position} onChange={handleInputChange} name="position" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" value={courseInput.price} onChange={handleInputChange} name="price" />
                    </Form.Group>

                    <Form.Group controlId="lng">
                        <Form.Label>Discounted Price</Form.Label>
                        <Form.Control type="number" value={courseInput.discountedPrice} onChange={handleInputChange} name="discountedPrice" />
                    </Form.Group>

                    <Form.Group controlId="freeAccessForFirstThirdOfAllLectures">
                        <Form.Check
                            type="checkbox"
                            checked={courseInput.freeAccessForFirstThirdOfAllLectures}
                            onChange={handleCheckboxChange}
                            name="freeAccessForFirstThirdOfAllLectures"
                            label="Free access for first third of all lectures"
                            inline
                        />
                    </Form.Group>

                    {/* <InputGroup className="mb-3">
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={handleCheckboxChange} name="allPlatformPromotions" />
                    </InputGroup> */}

                    {/* <Form.Group controlId="lng">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" value={courseInput.image} onChange={handleInputChange} name="image" />
                    </Form.Group> */}

                    <Form.Group controlId="lng">
                        <Form.Label>Image (file) </Form.Label>
                        <Form.Control type="file" onChange={handleFileUpload} />
                        {courseInput.image}
                    </Form.Group>

                    <Button style={{ marginTop: '20px', width: '100%' }} variant="dark" type="submit">Edit course</Button>

                </Form>

            </Container>
        )

}

export default CourseEditForm