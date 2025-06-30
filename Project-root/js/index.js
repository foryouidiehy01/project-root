if (!localStorage.getItem('users')) {
    let users = [
        {
            id: 1,
            username: "Bret",
            email: "Sincere@april.biz",
            password: "sincere@123",
            role: "ADMIN",
            status: true,
            birthday: "31/01/1995"
        },
        {
            id: 2,
            username: "Antonette",
            email: "Shanna@melissa.tv",
            password: "shanna@123",
            role: "USER",
            status: true,
            birthday: "02/01/1994"
        }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}
let usersData = localStorage.getItem('users');
let usersFromLocal = JSON.parse(usersData);

function renderUsersTable() {
    let tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    usersFromLocal.forEach((user,index) => {
        let row = `
        <tr>
         <td>${user.id}</td>
         <td>${user.username}</td>
         <td>${user.email}</td>
         <td>${user.role}</td>
         <td>${user.status ? 'Active' : 'Inactive'}</td>
         <td>${user.birthday}</td>
         <td>
          <button onclick="deleteUser(${index})">Xóa</button>
         </td>
        </tr>
        `;
        tableBody.innerHTML += row;
    });
}
function deleteUser(index) {
    usersFromLocal.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(usersFromLocal));
    renderUsersTable();
}
renderUsersTable();
