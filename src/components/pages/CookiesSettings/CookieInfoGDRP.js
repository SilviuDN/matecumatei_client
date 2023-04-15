import {React } from 'react';
// import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CookieGDRP = ({ show, onHide }) => {

  return (     
        <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton={false}>
        {/* <Modal.Header closeButton> */}
            <Modal.Title>Informații despre Cookies</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{ display: 'flex', alignItems: 'flex-start', marginTop: 0 }}>
            <div>
                {/* <h6>Nouă ne pasă ca datele tale personale să rămână confidențiale</h6> */}
                <p>
                    Pe acest site folosim cookie-uri tehnice și funcționale necesare autentificării sau vizualizării lecțiilor. 
                    Autentificarea prin intermediul formularului de login sau vizualizarea lecțiilor implică consimțământul pentru utilizarea acestor cookie-uri necesare.
                </p>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Am ințeles
            </Button>
            {/* <Button variant="primary" onClick={handleSave}>
                Save Changes
            </Button> */}
        </Modal.Footer>
        </Modal>
  );
};

export default CookieGDRP;
