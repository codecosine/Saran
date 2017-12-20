import axios from 'axios'
function signin(options){
  return axios.post('/sign/signin', options)
}
function signup(options){
  return axios.post('/sign/signup', options)
}
function logout(options){
  return axios.post('/sign/logout', options)
}

export default {
    signin,
    signup,
    logout,
}