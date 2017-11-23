import axios from 'axios'
function getList(){
  return axios.post('/api/getMaterialList')
}
function addMaterials(options){
  return axios.post('/api/addMaterial',options)
}
function destroyMaterial(options){
  return axios.post('/api/destroyMaterial',options)
}
function changeMaterial(options){
  return axios.post('/api/changeMaterial',options)
}

export default {
    getList,
    addMaterials,
    destroyMaterial,
    changeMaterial,
}