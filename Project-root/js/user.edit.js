document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".user-form");
  if (!form) return;

  const inputUserCode = form.querySelector("input[name='usercode']");
  const inputUsername = form.querySelector("input[name='username']");
  const inputEmail = form.querySelector("input[name='email']");
  const inputPassword = form.querySelector("input[name='password']");
  const selectRole = form.querySelector("select[name='role']");
  const inputBirthday = form.querySelector("input[name='birthday']");
  const textareaDescription = form.querySelector("textarea[name='description']");
  const statusRadios = form.querySelectorAll("input[name='status']");

  const userIdParam = new URLSearchParams(window.location.search).get("id");
  if (!userIdParam || isNaN(parseInt(userIdParam))) return;

  const userId = parseInt(userIdParam);
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.id === userId);
  if (!user) return;

  inputUserCode.value = `US${String(user.id).padStart(3, '0')}`;
  inputUsername.value = user.username;
  inputEmail.value = user.email;
  inputPassword.value = user.password;
  selectRole.value = user.role;
  inputBirthday.value = user.birthday;
  textareaDescription.value = user.description || "";

  statusRadios.forEach(radio => {
    radio.checked = (radio.value === (user.status ? "on" : "off"));
  });

  inputUserCode.disabled = true; 

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    users = JSON.parse(localStorage.getItem("users")) || [];
    const currentUserIndex = users.findIndex(u => u.id === userId);
    if (currentUserIndex === -1) return;

    const username = inputUsername.value.trim();
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();
    const role = selectRole.value;
    const birthday = inputBirthday.value;
    const description = textareaDescription.value.trim();
    const statusValue = form.querySelector("input[name='status']:checked")?.value;
    const status = statusValue === "on";

    const errors = [];

    if (!username) errors.push("Username không được để trống");
    if (!email) errors.push("Email không được để trống");
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      errors.push("Email không đúng định dạng");
    }
    if (!password) errors.push("Mật khẩu không được để trống");
    else if (password.length < 8) errors.push("Mật khẩu phải từ 8 ký tự trở lên");

    const isDuplicateUsername = users.some(u => u.username === username && u.id !== userId);
    if (isDuplicateUsername) errors.push("Username đã tồn tại!");

    const isDuplicateEmail = users.some(u => u.email === email && u.id !== userId);
    if (isDuplicateEmail) errors.push("Email đã tồn tại!");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    users[currentUserIndex] = {
      ...users[currentUserIndex],
      username,
      email,
      password,
      role,
      birthday,
      status,
      description
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("✅ Cập nhật người dùng thành công!");
    window.location.href = "user.html";
  });
});
