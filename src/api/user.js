import axios from 'axios'
function login(options){
  return axios.post('/sign/signin', options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function register(options){
  return axios.post('/sign/signup', options)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export default {
    login,
    register,
}