export default  (url, options = {}) => {
  return fetch(`http://localhost:3000/api/${url}`, options)
}