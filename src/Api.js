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

  getNotifications: () => {
    return fetch('http://localhost:3000/notifications', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
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

  deletePost: data => {
    return fetch(`http://localhost:3000/posts/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  createComment: data => {
    return fetch(`http://localhost:3000/posts/${data.post_id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
  },

  getPosts: () => {
    return fetch('http://localhost:3000/timeline', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  getComments: data => {
    return fetch(`http://localhost:3000/posts/${data}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  commentLike: (postId, commentId) => {
    return fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  commentUnlike: (postId, commentId) => {
    return fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}/unlike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
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

  searchUsers: (searchTerm) => {
    return fetch(`http://localhost:3000/users?search=${searchTerm}`, {
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
      headers: {
        "Content-Type": "application/json"
      },
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

  reblog: (data) => {
    return fetch('http://localhost:3000/reblogs', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  unreblog: (data) => {
    return fetch(`http://localhost:3000/reblogs/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
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
    return fetch(`http://localhost:3000/users/${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  }
}

export default Api;