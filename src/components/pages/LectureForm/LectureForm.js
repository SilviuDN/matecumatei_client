import { useState } from 'react'
import { Form, Button, Container, ListGroup, Row, Col } from 'react-bootstrap'
import LecturesService from '../../../services/lectures.services'
// import SectionsService from '../../../services/sections.services'
import Modal from '../../shared/Modal'
import UploadsService from '../../../services/uploads.service'
import Spinner from '../../shared/Spinner'

const LectureForm = (props) =>  {

    const [lectureInput, setLectureInput] = useState({
            sectionId: props.sectionId,
            name: '',
            sectionNumber: props.sectionNumber,
            lectureNumber: '',
            typeOfLecture: 'video',
            description: '',
            videoUrl: '',
            imageUrl: '',
            isUploading: false,
            authors: [props.loggedUser?._id],
            freeAccess: false,
            courseId: props.courseId,
            temporaryTag: '',
            tags: [],
            addTagEnabled: true,
    })

    const lecturesService = new LecturesService()
    // const sectionsService = new SectionsService()
    
    const uploadsService = new UploadsService()



    const handleInputChange = e => {
        const { name, value } = e.target

        setLectureInput((prevLectureInput) => {
            return { ...prevLectureInput, [name]: value }
        } )

    }

    const addTag = (e) => {
        e.preventDefault()
        if( lectureInput.temporaryTag.trim() !== ''){
            const tempTags = [...lectureInput.tags, lectureInput.temporaryTag]
            setLectureInput((prevLectureInput) => {
                return { ...prevLectureInput, tags: tempTags, temporaryTag: ''  }
            } )     
        }

    }


    const handleFileUpload = e => {

        setLectureInput((prevLectureInput) => {
            return { ...prevLectureInput, isUploading: true }
        } )

        const uploadData = new FormData()
        uploadData.append('imageData', e.target.files[0])

        uploadsService
            .uploadImage(uploadData)
            .then(response => {
                console.log(response.data.cloudinary_url)
                setLectureInput((prevLectureInput) => {
                    return { ...prevLectureInput, isUploading: false, imageUrl: response.data.cloudinary_url}
                    // return { ...prevLectureInput, isUploading: false, imageUrl: response.data.secure_url}
                } )
            })
            // this.setState({ isUploading: false, coaster: { ...this.state.coaster, imageUrl: response.data.secure_url } }))
            .catch(err => console.log(err))
    }


    const handleFormSubmit = e => {
        e.preventDefault()

        // console.log(props.courseId)


        lecturesService
            .saveLecture(lectureInput)
            .then((newLecture) => {

                setLectureInput({
                    name: '',
                    sectionNumber: '',
                    lectureNumber: '',
                    typeOfLecture: 'video',
                    description: '',
                    videoUrl: '',
                    imageUrl: '',
                    isUploading: false,
                    authors: [props.loggedUser?._id],
                    freeAccess: false,
                    sectionId: props.sectionId,
                    courseId: props.courseId,
                    temporaryTag: '',
                    tags: [],
                    addTagEnabled: true,
                })

                props.hideForm()
                props.toggleShowClasses()
                props.renderList()

            })
            .catch(err => console.log(err))

    }


        return (
            <Modal>
            <Container>

                <Form onSubmit={handleFormSubmit}>

                    <Form.Group controlId="name">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={lectureInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

                    <Form.Group controlId="lectureNumber">
                        <Form.Label>Lecture Number</Form.Label>
                        <Form.Control type="text" value={lectureInput.lectureNumber} onChange={handleInputChange} name="lectureNumber" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={lectureInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

<Form.Group controlId="typeOfLecture">
    <Form.Label>Type of Lecture</Form.Label>
    <Form.Control as="select" type="text" value={lectureInput.typeOfLecture} onChange={handleInputChange} name="typeOfLecture" custom="true">
        <option value="">-- Select the lecture type --</option>
        <option value="video">Video</option>
        <option value="written">Written document - Pdf</option>
        <option value="other">Other format</option>
    </Form.Control>                     
</Form.Group>


<Row style={{ alignItems: 'bottom' }}>
    <Col xs={6} md={3}>
        <Form.Group controlId="temporaryTag">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" value={lectureInput.temporaryTag} onChange={handleInputChange} name="temporaryTag" />
        </Form.Group>
    </Col>
    <Col xs={6} md={3}>
        <Button style={{ marginTop: '2em', width: '100%' }} variant="dark" onClick={addTag} disabled = {!lectureInput.addTagEnabled}>
            Add tag
        </Button>
    </Col>
    <Col xs={12} md={6} style={{ marginTop: '1.8em'}}>
        <ListGroup horizontal>
            {lectureInput.tags.map( (tag, index) => <ListGroup.Item key={index}>{tag}</ListGroup.Item>)}
        </ListGroup>
    </Col>
</Row>

                    {/* <Form.Group controlId="typeOfLecture">
                        <Form.Label>Type of Lecture</Form.Label>
                        <Form.Control type="text" value={lectureInput.typeOfLecture} onChange={handleInputChange} name="typeOfLecture" />
                    </Form.Group> */}

                    <Form.Group controlId="videoUrl">
                        <Form.Label>Video Url</Form.Label>
                        <Form.Control type="text" value={lectureInput.videoUrl} onChange={handleInputChange} name="videoUrl" />
                    </Form.Group>

                    <Form.Group controlId="imageUrl">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="file" onChange={e => handleFileUpload(e)} />
                    </Form.Group>

                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'10%' }} variant="dark" onClick={props.hideForm}>Cancel</Button>
                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'20%' }} variant="dark" type="submit" disabled={lectureInput.isUploading}>
                        {lectureInput.isUploading ? 'Uploading' : 'Create lecture'}
                    </Button>
                    {lectureInput.isUploading && <div style={{float: 'right'}}><Spinner size={30}/></div>}


                </Form>

            </Container>
            </Modal>
        )

}

export default LectureForm