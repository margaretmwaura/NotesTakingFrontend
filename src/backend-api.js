import axios from 'axios'
import store from './store'

axios.defaults.withCredentials = true;
let token = store.state.token
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
export default axios.create({
  baseURL: 'http://localhost:8400',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
