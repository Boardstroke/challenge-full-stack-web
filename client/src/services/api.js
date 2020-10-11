export default (url, options = {}) => {
  return fetch(`http://localhost:3000/api/${url}`, {
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors",
    ...options,
  });
};
