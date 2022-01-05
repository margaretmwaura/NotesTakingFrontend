import axios from 'axios'
import store from './store'

// TODO get a way to solve the header error
axios.defaults.withCredentials = true;
let token = store.state.token
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
let axiosInstance = axios.create({
  baseURL: 'http://localhost:8400',
  // headers: {
  //   'Authorization': `Bearer ${token}`
  // }
})

// axiosInstance.interceptors.request.use(
//   config => {
//     const auth = `Bearer ${token}`;
//     config.headers.common['Authorization'] = auth;
//     return config;
//   },
//   error => Promise.reject(error),
// );

export default axiosInstance
