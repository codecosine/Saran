import axios from 'axios'
function login(options){
  return axios.post('/sign/signin', options)
}
function register(options){
  return axios.post('/sign/signup', options)
}
export default {
    login,
    register,
}