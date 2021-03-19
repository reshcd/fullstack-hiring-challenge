import axios from 'axios';
const API_URL = 'http://localhost:8080';

export default class Services{

    constructor(){}

    deleteUser(user){
        const url = `${API_URL}/api/delete/`;
        
        return axios.post(url,user);
    }

    updateUser(user){
        const url = `${API_URL}/api/update/`;
        
        return axios.put(url,user);
    }

    listUsers(){
        const url = `${API_URL}/api/users/`;
        
        return axios.get(url);
    }

}