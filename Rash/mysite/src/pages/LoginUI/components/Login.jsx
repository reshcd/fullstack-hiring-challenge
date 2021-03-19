import React, { useState, useContext } from 'react';
import './style.scss'
import Services from '../Services'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from "react-router-dom";
import StoreContext from '../../../storage/Context'

function Login() {
    const service = new Services()
    const history = useHistory();

    toast.configure()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const {setToken,setID} = useContext(StoreContext)

    function login() {
     
        let user = {"name": name,"password": password}
        let { token } = { token:null }
        
        service.getUser(user)
            .then((result) => {
                user = result.data
                
                if (result.status == 200) {
                    if(user.password == password && user.name == name){
                        token = user.token
                        setToken(token)
                        setID(user.id)

                        history.push('/home')
                    }
                    else{
                        toast('Usuário ou senha incorreto')
                    }
                }
                else {
                    toast(result.data)
                }
            })
            .catch(() => { toast('Erro interno') })
    }

    return (
        <div className='base-container'>
            <div className='header'>Login</div>
            <div className='content'>
                <div className='form'>
                    <div className='form-group'>
                        <label htmlFor='username'>Usuário</label>
                        <input type='text' name='username' placeholder='Nome de usuário' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Senha</label>
                        <input type='password' name='password' placeholder='Senha' onChange={(e) => { setPassword(e.target.value) }} />
                    </div>

                    <div className='footer'>
                        <button className="btn btn-outline-primary" type='submit' onClick={() => { login() }}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login