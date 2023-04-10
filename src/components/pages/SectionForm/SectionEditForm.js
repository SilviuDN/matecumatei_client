import { useState, useEffect } from 'react'
import { Form, Button, Container, ListGroup, Row, Col  } from 'react-bootstrap'
import SectionsService from '../../../services/sections.services'
// import CoursesService from '../../../services/courses.services'
import Modal from '../../shared/Modal'

const SectionEditForm = (props) =>  {

    const [sectionInput, setSectionInput] = useState({
            courseId: props.courseId,
            name: '',
            sectionNumber: 0,
            description: '',
            authors: [props.loggedUser?._id],
            temporaryTag: '',
            tags: [],
            addTagEnabled: true,
    })

    const sectionsService = new SectionsService()
    // const coursesService = new CoursesService()

    useEffect(() => {   
        const sectionsService = new SectionsService() 
        let isMounted = true
        sectionsService
            .getSection(props.sectionId)
            .then(response => {
                const tempAuthors= props.loggedUser?.role==='admin' ? [...response.data.authors] : [...response.data.authors, props.loggedUser?._id]
                if( isMounted ){
                    setSectionInput(prevSectionInput => ({
                        ...prevSectionInput,
                        ...response.data,
                        authors: tempAuthors,
                    }));
                    isMounted = false
                }

                })
            .catch(err => console.log(err));
            // return () => {
            //     isMounted = false;
            //     // Cancel any pending requests or subscriptions here
            // };
      }, [props.sectionId, props.loggedUser?.role, props.loggedUser?._id]);



    const handleInputChange = e => {
        const { name, value } = e.target

        // React SCHEDULES state updates, does not perform them instantly ==> if more updates scheduled, wrong state might be used
        // INSTEAD OF:

        // setSectionInput({
        //     ...sectionInput,
        //     [name]: value
        // })

        // WE USE:


        setSectionInput((prevSectionInput) => {
            return { ...prevSectionInput, [name]: value }
        } )

        // and React GUARANTEES the latest state will be used

        // IF STATE UPDATE DEPENDS ON THE PREVIOUS STATE, USE THE ARROW FUNCTION
    }

    const addTag = (e) => {
        e.preventDefault()
        if( sectionInput.temporaryTag.trim() !== ''){
            const tempTags = [...sectionInput.tags, sectionInput.temporaryTag]
            setSectionInput((prevSectionInput) => {
                return { ...prevSectionInput, tags: tempTags, temporaryTag: ''  }
            } )     
        }

    }


    const handleFormSubmit = e => {
        e.preventDefault()

        // console.log(props.courseId)

        sectionsService
            .editSection(sectionInput)
            .then((newSection) => {

                setSectionInput({
                    name: '',
                    description: '',
                    sectionNumber: 0,
                    authors: [props.loggedUser?._id],
                    temporaryTag: '',
                    tags: [],
                    addTagEnabled: true,
                })

                props.hideForm()
                // props.toggleShowClasses()
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
                        <Form.Control type="text" value={sectionInput.name} onChange={handleInputChange} name="name" />
                    </Form.Group>

                    <Form.Group controlId="desc">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={sectionInput.description} onChange={handleInputChange} name="description" />
                    </Form.Group>

                    <Form.Group controlId="sectionNumber">
                        <Form.Label>Section Number</Form.Label>
                        <Form.Control type="number" value={sectionInput.sectionNumber} onChange={handleInputChange} name="sectionNumber" />
                    </Form.Group>

<Row style={{ alignItems: 'bottom' }}>
    <Col xs={6} md={3}>
        <Form.Group controlId="temporaryTag">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="text" value={sectionInput.temporaryTag} onChange={handleInputChange} name="temporaryTag" />
        </Form.Group>
    </Col>
    <Col xs={6} md={3}>
        <Button style={{ marginTop: '2em', width: '100%' }} variant="dark" onClick={addTag} disabled = {!sectionInput.addTagEnabled}>
            Add tag
        </Button>
    </Col>
    <Col xs={12} md={6} style={{ marginTop: '1.8em'}}>
        <ListGroup horizontal>
            {sectionInput.tags.map( (tag, index) => <ListGroup.Item key={index}>{tag}</ListGroup.Item>)}
        </ListGroup>
    </Col>
</Row>

                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'10%' }} variant="dark" onClick={props.hideForm}>Cancel</Button>
                    <Button style={{ marginTop: '20px', width: '30%', marginLeft:'20%' }} variant="dark" type="submit">Edit section</Button>

                </Form>

            </Container>
            </Modal>
        )

}

export default SectionEditForm