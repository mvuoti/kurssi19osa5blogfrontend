import axios from 'axios'
const baseUrl = '/api/blogs'


const makeAuthorizationHeader = (token) => {
  return { Authorization: `Bearer ${token}` }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const save = (blog, token) => {
  const authHead = makeAuthorizationHeader(token)
  const config = { headers: authHead }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { getAll, save }