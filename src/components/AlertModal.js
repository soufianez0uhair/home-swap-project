import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function AlertModal({show, handleShow, handleClick, handleClose, title, clickText, body, action}) {

  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {body}
        </Modal.Body>
        <Modal.Footer>
          {action && <Button variant="primary" ><Link to={action.link} style={{textDecoration: "none",color: "#fff"}} >{action.name}</Link></Button>}
          {clickText && <Button variant="danger" onClick={handleClick}>{clickText}</Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;