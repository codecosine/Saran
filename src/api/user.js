import axios from 'axios'

function getList(){
  return axios.post('/api/getMemberList')
}
function getListByDep(options){
  return axios.post('/api/getMemberListByDep',options)
}
function getListByDep(options){
  return axios.post('/api/getMemberListByDep',options)
}
function changePwd(options){
  return axios.post('/api/changePwd',options)
}
function changeAuth(options){
  return axios.post('/api/changeAuth',options)
}
function changeDep(options){
  return axios.post('/api/changeDep',options)
}
export default {
    getList,
    changePwd,
    changeAuth,
    changeDep,
}