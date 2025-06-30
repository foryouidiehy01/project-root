let users = JSON.parse(localStorage.getItem("users")) || [];
console.log("Sign-in", users);
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
    } else if (password.length < 6) {
        passwordError.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        isValid = false;
    }
    if (!isValid) return;
    let foundUser = users.find(user => user.email === email && user.password === password);

    if (!foundUser) {
        showHug("❌ Email hoặc mật khẩu không đúng!", "#f44336");
    } else {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        showHug("🎉 Đăng nhập thành công!");
        setTimeout(() => {
            window.location.href = "http://127.0.0.1:5500/user.html";
        }, 1500);
    }
});

function showHug(message, color = "#4caf50") {
    const hug = document.getElementById("hug-alert");
    hug.textContent = message;
    hug.style.backgroundColor = color;
    hug.classList.add("show");
    setTimeout(() => hug.classList.remove("show"), 3000);
}
