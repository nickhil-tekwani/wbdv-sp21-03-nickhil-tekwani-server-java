(function () {
  let selectedUser;
  let users;
  let userById;

  function main() {
    // fields
    $usernameFld = $("#usernameFld");
    $passwordFld = $("#passwordFld");
    $firstNameFld = $("#firstNameFld");
    $lastNameFld = $("#lastNameFld");
    $roleFLd = $("#roleFld");
    // buttons
    $editBtn = $(".wbdv-edit");
    $createBtn = $(".wbdv-create");
    $removeBtn = $(".wbdv-remove");
    // other
    $tBody = $(".wbdv-tbody");
    $userRowTemplate = $(".wbdv-template");
    userService = new AdminUserServiceClient();
    users = [];
    selectedUser = null;
    userById = null;

    $createBtn.click(() => {
      createUser({
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstName: $firstNameFld.val(),
        lastName: $lastNameFld.val(),
        role: $roleFLd.val(),
      });
      resetInputs();
    });

    $editBtn.click(updateUser);
    findAllUsers();
  }

  function createUser(user) {
    userService.createUser(user).then((data) => {
      users.push(data);
      renderUser(users);
    });
  }

  function deleteUser(event) {
    const selectedButton = $(event.target);
    const idx = selectedButton.attr("id");

    const userId = users[idx]._id;

    userService.deleteUser(userId).then(() => {
      users.splice(idx, 1);
      renderUser(users);
    });
  }

  function selectUser(event) {
    let selectedButton = $(event.target);
    selectedUser = users.find((user) => user._id === selectedButton.attr("id"));

    $usernameFld.val(selectedUser.username);
    $passwordFld.val(selectedUser.password);
    $firstNameFld.val(selectedUser.firstName);
    $lastNameFld.val(selectedUser.lastName);
    $roleFLd.val(selectedUser.role);
  }
  function updateUser(event) {
    if (selectedUser !== null && selectedUser !== undefined) {
      selectedUser.username = $usernameFld.val();
      selectedUser.password = $passwordFld.val();
      selectedUser.firstName = $firstNameFld.val();
      selectedUser.lastName = $lastNameFld.val();
      selectedUser.role = $roleFLd.val();

      userService.updateUser(selectedUser._id, selectedUser).then((status) => {
        userService.findAllUsers().then((data) => {
          users = data;
          renderUser(users);
        });
      });
      resetInputs();
    } else console.log();
  }

  function renderUser(users) {
    $tBody.empty();
    for (var i = 0; i < users.length; i++) {
      const user = users[i];
      $tBody.prepend(`
                <tr class="wbdv-template wbdv-user wbdv-hidden">
                    <td class="wbdv-username">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="wbdv-first-name">${user.firstName}</td>
                    <td class="wbdv-last-name">${user.lastName}</td>
                    <td class="wbdv-role">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="float-right">
                            <button type="button" class="btn" >
                                <i class="fa-2x fa fa-times wbdv-remove-btn" id="${i}"></i>
                            </button>
                            <button type="button" class="btn">
                                <i class="fa-2x fa fa-pencil wbdv-modify-btn" id="${user._id}"></i>
                            </button>
                        </span>
                    </td>
                </tr>
            `);
    }
    $(".wbdv-remove-btn").click(deleteUser);
    $(".wbdv-modify-btn").click(selectUser);
  }

  function findAllUsers() {
    userService.findAllUsers().then((data) => {
      users = data;
      renderUser(users);
    });
  }

  function resetInputs() {
    $usernameFld.val("");
    $passwordFld.val("");
    $firstNameFld.val("");
    $lastNameFld.val("");
    $roleFLd.val("FACULTY");
    selectedUser = null;
  }

  $(main);
})();
