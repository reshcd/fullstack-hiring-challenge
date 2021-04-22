import { Modal, Button } from 'react-bootstrap'
import React, { useState } from 'react'
import Services from '../services'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './modal.scss'


function ModalEdit(props) {

  const [name, setName] = useState(props.user.name)
  const [email, setEmail] = useState(props.user.email)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const service = new Services();
  const handleClose = () => props.met(false);

  function Cadastar(e) {
    
    if (password == passwordConfirm){
      let user = {
        "name": name,
        "email": email,
        "id": props.user.id,
        "password":passwordConfirm
      }
      service.updateUser(user)
      .then((result) => {
          toast(result.data)
          if(result.status == 200){
            props.met(false)
            props.att(true)
          }
        })
        .catch(() => { toast('Erro interno') })
    }
    else{
      toast('Senhas não conferem')
    }
  }

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className='content'>
            <div className='form'>
              <div className='form-group'>
                <label htmlFor='username'>Usuário</label>
                <input type='text' name='username' value={name} placeholder='Nome de usuário' onChange={(e) => { setName(e.target.value) }} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>E-m@il</label>
                <input type='text' name='email' value={email} placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Senha</label>
                <input type='password' name='password' placeholder='Senha' onChange={(e) => { setPassword(e.target.value) }} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Confrme a senha</label>
                <input type='password' name='password' placeholder='Senha' onChange={(e) => { setPasswordConfirm(e.target.value) }} />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
          <Button variant="primary" onClick={Cadastar}>
            Confirmar
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default ModalEdit
