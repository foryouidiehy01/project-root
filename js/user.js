if (!localStorage.getItem('users')) {
  let users = [
    {
      id: 1,
      username: "Bret",
      email: "Sincere@april.biz",
      password: "sincere@123",
      role: "ADMIN",
      status: true,
      birthday: "1995-01-31"
    },
    {
      id: 2,
      username: "Antonette",
      email: "Shanna@melissa.tv",
      password: "shanna@123",
      role: "USER",
      status: true,
      birthday: "1994-01-02"
    }
  ];
  localStorage.setItem('users', JSON.stringify(users));
}

let usersData = localStorage.getItem('users');
let usersFromLocal = JSON.parse(usersData);

function formatBirthday(birthday) {
  if (!birthday) return ""; 
  const date = new Date(birthday);
  if (isNaN(date)) return ""; 
  let day = String(date.getDate()).padStart(2, '0');
  let month = String(date.getMonth() + 1).padStart(2,'0'); 
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


function renderUsersTable() {
  let tableBody = document.getElementById('userTableBody');
  tableBody.innerHTML = '';
  usersFromLocal.forEach(user => {
    let userCode = `US${String(user.id).padStart(3, '0')}`;
    let row = `
      <tr>
        <td>${userCode}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${formatBirthday(user.birthday)}</td>
        <td>
          <span class="status-badge ${user.status ? 'active' : 'inactive'}">
            <i class="fa-solid fa-circle"></i> ${user.status ? 'Active' : 'Deactive'}
          </span>
        </td>
        <td>
          <button class="action-btn delete-btn" onclick="deleteUser(${user.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="action-btn edit-btn" onclick="editUser(${user.id})">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

function deleteUser(userId) {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xoá người dùng này?");
  if (!confirmDelete) return;

  let userIndex = usersFromLocal.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    usersFromLocal.splice(userIndex, 1);
    localStorage.setItem("users", JSON.stringify(usersFromLocal));
    renderUsersTable();
  }
}

function editUser(userId) {
  window.location.href = `user.edit.html?id=${userId}`;
}

renderUsersTable();
