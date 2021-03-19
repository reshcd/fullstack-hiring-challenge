import React, { useState, useEffect } from 'react';
import './usersUI.scss'
import { useLocation } from 'react-router-dom';
import Services from './services'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalEdit from './components/modalEdit'
import ModalDelete from './components/modalDelete'

function UsersUI() {

  const location = useLocation()
  let params = location.state
  const services = new Services()

  const [users, setItems] = useState([]);
  const [showME, setMe] = useState(false);
  const [showMD, setMd] = useState(false);
  const [currentIndex, setIndex] = useState(0);

  toast.configure()

  function getUsers() {
    services.listUsers().then((result) => {
      if(result.status === 200){
        setItems(result.data)
      }
      else{
        setItems([])
        toast(result.data)
      }
    }).catch(() => { toast('Erro interno') })
  }

  function deleteUser(index) {
    setMd(true)
    setIndex(index)
  }

  function logout() {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    getUsers()
  }, [])

  function updateUser(index) {
    setMe(true)
    setIndex(index)
  }

  function att(result) {
    if (result === true) {
      getUsers()
    }
  }

  return (

    <div className="container">
      <div className="row mb-3">
        <div className="button-left">
          <button type="button" className="btn btn-light" onClick={logout}>Logout</button>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <div className="table-wrapper-scroll-y my-custom-scrollbar ">
          <table className=" table table-hover" >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Usuário</th>
                <th scope="col">Email</th>
                <th scope="col">Opções</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr className="table-light" key={user.id}>
                    <td scope="row">{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button type="button" className="btn btn-primary mr-1" onClick={() => { updateUser(index) }}>Edit</button>
                      <button type="button" className="btn btn-danger" disabled={((localStorage.getItem('ID')).replace(/[\\"]/g, '') == user.id)} onClick={() => { deleteUser(index) }}>Delete</button>
                    </td>
                  </tr>)
              })}

            </tbody>
          </table>
        </div>
      </div>
        {showME == true ? <ModalEdit user={users[currentIndex]} met={setMe} att={att}></ModalEdit> : <div />}
        {showMD == true ? <ModalDelete user={users[currentIndex]} met={setMd} att={att}></ModalDelete> : <div />}
      </div>
    </div>
  )
}

export default UsersUI