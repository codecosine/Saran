import axios from 'axios'
function getList(){
  return axios.post('/api/getMessageList')
}
function addMessage(options){
  return axios.post('/api/addMessage', options)
}
export default {
  getList,
  addMessage,
}