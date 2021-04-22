import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Services from '../services'

function ModalEdit(props) {

  const handleClose = () => props.met(false);

  toast.configure()
  const services = new Services()

  function deleteUser(user) {
    services.deleteUser(user).then((result) => {
      toast('Deletado')
    })
    .then(()=>{props.met(false);props.att(true)})
    .catch(() => { toast('Erro interno') })
  }

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deletar usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja deletar {props.user.name}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
          <Button variant="primary" onClick={()=>{deleteUser(props.user)}}>
            Confirmar
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalEdit
