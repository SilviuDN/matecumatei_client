import {Container, Button} from 'react-bootstrap'
// import {Container} from 'react-bootstrap'
import { useHistory, Link } from 'react-router-dom'
// import { useHistory, Link } from 'react-router-dom'
import './IndexPage.css'

const IndexPage = ({loggedUser}) => {

    const history = useHistory();

    const handleAllCoursesButton = () => {
        history.push('/courses');
    };

    return (

        <Container className="bgImg" fluid>
            <div className="d-flex flex-column justify-content-start align-items-center h-100 mt-5">
                <h1 className="text-center mb-4">Bine ai venit pe MateCuMatei{loggedUser ? `, ${loggedUser.username?.trim().split(' ')[0]}!` : '!'}</h1>
                {
                    !loggedUser
                    ?
                    <h3 className="text-center mb-4">Autentifică-te pentru a accesa conținutul cursurilor.</h3>
                    :
                    null
                }
                <h6 className="text-center mb-4">Momentan recomandăm Mozilla Firefox.</h6>
                <Button className="btn bg-secondary mb-4"  onClick={handleAllCoursesButton} style={{zIndex:1}}>Vezi cursuri</Button>
                <h3 className="text-center mb-4">MateCuMatei - Idei, nu formule.</h3>
            </div>
        </Container>
        
    )
}

export default IndexPage