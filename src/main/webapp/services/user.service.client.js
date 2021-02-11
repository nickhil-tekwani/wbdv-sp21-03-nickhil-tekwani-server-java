function AdminUserServiceClient() {
  this.createUser = createUser;
  this.findAllUsers = findAllUsers;
  this.findUserById = findUserById;
  this.deleteUser = deleteUser;
  this.updateUser = updateUser;
  this.url = "https://wbdv-generic-server.herokuapp.com/api/001483077/users";
  var self = this;

  function createUser(user) {
    return fetch(self.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => {
      return res.json();
    });
  }

  function findAllUsers() {
    return fetch(self.url).then((res) => {
      return res.json();
    });
  }

  function findUserById(userId) {
    return fetch(`${self.url}/${userId}`, {
      method: "GET",
    }).then((res) => {
      return res.json();
    });
  }

  function updateUser(userId, user) {
    return fetch(`${self.url}/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then((res) => res.json());
  }

  function deleteUser(userId) {
    return fetch(`${self.url}/${userId}`, {
      method: "DELETE",
    });
  }
}
