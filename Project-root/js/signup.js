let users = JSON.parse(localStorage.getItem("users")) || []

let form = document.getElementById("main-form")
form.addEventListener("submit", function (e) {
    e.preventDefault() 

    let email = document.getElementById("email").value
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let emailError = document.getElementById("emailError")
    let usernameError = document.getElementById("usernameError")
    let passwordError = document.getElementById("passwordError")

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  
    emailError.innerText = ''
    usernameError.innerText = ''
    passwordError.innerText = ''

    let isValid = true;
    if (!emailRegex.test(email)) {
        emailError.innerText = 'Email không hợp lệ'
        isValid = false
    }
    if (!usernameRegex.test(username)) {
        usernameError.innerText = 'UserName không hợp lệ'
        isValid = false
    }
    if (!passwordRegex.test(password)) {
        passwordError.innerText = 'Password không hợp lệ'
        isValid = false
    }
    if (isValid) {
        let newUser = {
            id: users.length + 1,
            username: username,
            email: email,
            password: password,
            status: "ACTIVE",
            birthday: 1/1/2001,
            role : "USER",
            
        }
        users.push(newUser)
        localStorage.setItem("users", JSON.stringify(users))
        alert('🎉 Đăng ký thành công!');
        window.location.href = "http://127.0.0.1:5500/pages/signin.html"
    }
});
