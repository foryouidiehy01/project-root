let users = JSON.parse(localStorage.getItem("users")) || [];

let form = document.getElementById("main-form");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    emailError.innerText = "";
    usernameError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;

    if (!emailRegex.test(email)) {
        emailError.innerText = "Email không hợp lệ";
        isValid = false;
    } else if (users.some(u => u.email === email)) {
        emailError.innerText = "Email đã tồn tại";
        isValid = false;
    }

    if (!usernameRegex.test(username)) {
        usernameError.innerText = "Username không hợp lệ (4-16 ký tự, chữ/số)";
        isValid = false;
    } else if (users.some(u => u.username === username)) {
        usernameError.innerText = "Username đã tồn tại";
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        passwordError.innerText = "Mật khẩu phải ít nhất 6 ký tự, có cả số và chữ";
        isValid = false;
    }

    if (!isValid) return;

    let newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    let newUser = {
        id: newId,
        username: username,
        email: email,
        password: password,
        role: "USER",
        status: false,
        birthday: "",
        description: ""
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Đăng ký thành công!");
    window.location.href = "http://127.0.0.1:5500/pages/signin.html";

});
