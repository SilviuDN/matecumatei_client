import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notFoundImage from './not-found-404.jpg';

const NotFound = () => {
    const style = {
      fontWeight: 'bold',
      textAlign: 'center',
    }
  
    return (
        <Container className="d-flex align-items-center justify-content-between mt-5 fluid">
            <Row className="w-100">
                <Col md={6}>
                    <Image src={notFoundImage} alt="not found image" fluid />
                </Col>
                <Col md={6} className="d-flex flex-column justify-content-center">
                    <Row>
                        <Col>
                            <h1 className="text-black">404 <span className="text-warning">Error!</span></h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="text-black">Pagina căutată nu există. Vizitați 
                                <Link to={'/'} style={{ textDecoration: 'none' }}>
                                    <span className="text-warning"> Pagina principală</span>
                                </Link>
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
  }
  
  export default NotFound;