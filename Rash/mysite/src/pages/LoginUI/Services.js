import axios from 'axios';
const API_URL = 'http://localhost:8080';

export default class Services{

    constructor(){}

    createUser(user){
        const url = `${API_URL}/api/create/`;
        
        return axios.post(url,user);
    }

    getUser(user){
        const url = `${API_URL}/api/login_user/`;
        
        return axios.post(url,user);
    }
}