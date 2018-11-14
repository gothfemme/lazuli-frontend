// const headers = {
//   "Content-Type": "application/json",
//   "Authorization": "Bearer " + (localStorage.jwt)
// }

const BASEURL = 'http://10.39.108.59:3000'

function handleResponse(response) {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = Object.assign({}, json, {
          status: response.status,
          statusText: response.statusText,
        });

        return Promise.reject(error);
      }
      return json;
    });
}

function checkError(res) {
  if (res.ok) {
    return res;
  } else {
    throw Error(`Request rejected with status ${res.status}`);
  }
}

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
    return fetch(`${BASEURL}/user/token`, options)
      .then(checkError)
      .then(r => r.json())
      .then(r => {
        localStorage.setItem("jwt", r.jwt)
      })
  },

  validUsername: data => {
    return fetch(`${BASEURL}/users/is_valid?username=${data}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(r => r.json())
  },

  getNotifications: () => {
    return fetch(`${BASEURL}/notifications`, {
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
    return fetch(`${BASEURL}/users/current`, options)
      .then(r => r.json())
  },

  deletePost: data => {
    return fetch(`${BASEURL}/posts/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  createComment: data => {
    return fetch(`${BASEURL}/posts/${data.post_id}/comments`, {
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
    return fetch(`${BASEURL}/timeline`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  patchUser: (data) => {
    return fetch(`${BASEURL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        },
        body: JSON.stringify(data)
      })
      .then(r => r.json())
  },

  getComments: data => {
    return fetch(`${BASEURL}/posts/${data}/comments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  commentLike: (postId, commentId) => {
    return fetch(`${BASEURL}/posts/${postId}/comments/${commentId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  commentUnlike: (postId, commentId) => {
    return fetch(`${BASEURL}/posts/${postId}/comments/${commentId}/unlike`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  searchSite: (searchTerm) => {
    return fetch(`${BASEURL}/posts?search=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  searchUsers: (searchTerm) => {
    return fetch(`${BASEURL}/users?search=${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + (localStorage.jwt)
        }
      })
      .then(r => r.json())
  },

  createPost: (data) => {
    return fetch(`${BASEURL}/posts`, {
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
    return fetch(`${BASEURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
  },

  follow: (data) => {
    return fetch(`${BASEURL}/users/${data}/follow`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  unfollow: (data) => {
    return fetch(`${BASEURL}/users/${data}/unfollow`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      }
    })
  },

  reblog: (data) => {
    return fetch(`${BASEURL}/reblogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  unreblog: (data) => {
    return fetch(`${BASEURL}/reblogs/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  like: (data) => {
    return fetch(`${BASEURL}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  unlike: (data) => {
    return fetch(`${BASEURL}/likes/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + (localStorage.jwt)
      },
      body: JSON.stringify(data)
    })
  },

  getUser: (data) => {
    return fetch(`${BASEURL}/users/${data}`, {
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