document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".user-form");
  const inputs = form.querySelectorAll("input, select, textarea");
  const userIdParam = new URLSearchParams(window.location.search).get("id");

  if (!userIdParam || isNaN(parseInt(userIdParam))) {
    alert("Thiếu hoặc sai ID người dùng!");
    window.location.href = "user.html";
    return;
  }

  const userId = parseInt(userIdParam);
  let users = JSON.parse(localStorage.getItem("users"));

  if (!Array.isArray(users) || users.length === 0) {
    alert("Chưa có người dùng nào trong hệ thống. Hãy thêm trước!");
    window.location.href = "user.html";
    return;
  }

  const user = users.find(u => u.id === userId);

  if (!user) {
    alert("Không tìm thấy người dùng!");
    window.location.href = "user.html";
    return;
  }

  inputs[0].value = `US${String(user.id).padStart(3, '0')}`;
  inputs[1].value = user.username;
  inputs[2].value = user.email;
  inputs[3].value = user.password;
  inputs[4].value = user.role;
  inputs[5].value = user.birthday;
  inputs[7].value = user.description;

  form.querySelector(`input[name='status'][value='${user.status ? "on" : "off"}']`).checked = true;

  inputs[0].disabled = true;
  inputs[2].disabled = true;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const password = inputs[3].value.trim();
    const role = inputs[4].value;
    const birthday = inputs[5].value;
    const description = inputs[7].value.trim();
    const statusValue = form.querySelector("input[name='status']:checked")?.value;
    const status = statusValue === "on";

    const errors = [];

    if (!username) errors.push("Username không được để trống");
    if (!email) errors.push("Email không được để trống");
    else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push("Email không đúng định dạng");

    if (!password) {
      errors.push("Mật khẩu không được để trống");
    } else if (password.length < 8) {
      errors.push("Mật khẩu phải từ 8 ký tự trở lên");
    }

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const updatedUser = {
      ...user,
      username,
      email,
      password,
      role,
      birthday,
      status,
      description,
    };

    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("users", JSON.stringify(users));
      alert("Cập nhật người dùng thành công!");
      window.location.href = "user.html";
    } else {
      alert("Không thể cập nhật người dùng. Vui lòng thử lại.");
    }
  });
});