// const headers = {
//   "Content-Type": "application/json",
//   "Authorization": "Bearer " + (localStorage.jwt)
// }

const Api = {
  getToken: (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        auth: data
      })
    }
    return fetch('http://localhost:3000/user/token', options)
      .then(r => r.json())
      .then(r => {
        localStorage.setItem("jwt", r.jwt)
      })
  },

  getCurrentUser: () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    }
    return fetch('http://localhost:3000/users/current', options)
      .then(r => r.json())
      .then(user => {
        localStorage.setItem("user", JSON.stringify(user))
      })
  },

  getPosts: () => {
    return fetch('http://localhost:3000/posts', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  searchSite: (searchTerm) => {
    return fetch(`http://localhost:3000/posts?search=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  createPost: (data) => {
    return fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
  },

  createUser: (data) => {
    return fetch('http://localhost:3000/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
  },

  follow: (data) => {
    return fetch(`http://localhost:3000/users/${data}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  unfollow: (data) => {
    return fetch(`http://localhost:3000/users/${data}/unfollow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  like: (data) => {
    return fetch('http://localhost:3000/likes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  unlike: (data) => {
    return fetch(`http://localhost:3000/likes/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  getUser: (data) => {
    return fetch(`http://localhost:3000/users/${data}`)
      .then(r => r.json())
  }
}

export default Api;