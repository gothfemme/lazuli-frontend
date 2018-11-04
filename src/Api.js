const headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + (localStorage.jwt)
}

const Api = {
  getPosts: () => {
    return fetch('http://localhost:3000/posts', {
        method: "GET",
        headers: headers
      })
      .then(r => r.json())
  },
  createPost: (data) => {
    return fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
      })
      .then(r => r.json())
  }
}

export default Api;