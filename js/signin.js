let users = JSON.parse(localStorage.getItem("users")) || [];
let form = document.getElementById("main-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let emailError = document.getElementById("emailError");
  let passwordError = document.getElementById("passwordError");

  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  if (email === "") {
    emailError.textContent = "Email không được để trống";
    isValid = false;
  }

  if (password === "") {
    passwordError.textContent = "Mật khẩu không được để trống";
    isValid = false;
  }

  if (!isValid) return;

  const user = users.find(u => u.email === email);

  if (!user) {
    emailError.textContent = "Email không tồn tại";
    return;
  }

  if (user.password !== password) {
    passwordError.textContent = "Mật khẩu không đúng";
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  showHug("🎉 Đăng nhập thành công!");
  setTimeout(() => {
    window.location.href = "./user.html";
  }, 1500);
});

function showHug(message, color = "#28a745") {
  const hug = document.getElementById("hug-alert");
  hug.textContent = message;
  hug.style.backgroundColor = color;
  hug.classList.add("show");
  setTimeout(() => hug.classList.remove("show"), 3000);
}
