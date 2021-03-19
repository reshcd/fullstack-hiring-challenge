import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import './style.scss'
import Services from '../Services'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StoreContext from '../../../storage/Context'
import create_UUID from '../../../utils/common'

function Register() {

    const service = new Services()
    const history = useHistory();
    
    toast.configure()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setToken, setID} = useContext(StoreContext)

    function Cadastar(e) {
        let user = {
            "name": name,
            "email": email,
            "password": password
        }

        service.createUser(user)
            .then((result) => {
                let id = result.data.id
                let token = result.data.token
    
                if(result.status == 200){
                    setToken(token)
                    setID(id)
                    history.push('home/', id)
                }
                else{
                    toast(result.data)
                }
            })
            .catch(() => { toast('Erro interno') })
    }

    return (
        <div className='base-container'>
            <div className='header'>Cadastar</div>
            <div className='content'>
                <div className='form'>
                    <div className='form-group'>
                        <label htmlFor='username'>Usuário</label>
                        <input type='text' name='username' placeholder='Nome de usuário' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>E-m@il</label>
                        <input type='text' name='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='password' placeholder='Senha' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className='footer'>
                        <button className="btn btn-outline-primary" type='button' value='submit' onClick={Cadastar}>Cadastar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register