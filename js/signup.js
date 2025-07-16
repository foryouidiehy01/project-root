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

    emailError.innerText = "";
    usernameError.innerText = "";
    passwordError.innerText = "";

    let isValid = true;
    if (email === "") {
        emailError.innerText = "Email không được để trống";
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.innerText = "Email phải đúng định dạng (vd: example@gmail.com)";
        isValid = false;
    }

    if (username === "") {
        usernameError.innerText = "Tài khoản không được để trống";
        isValid = false;
    } else if (users.some(u => u.username === username)) {
        usernameError.innerText = "Tài khoản đã tồn tại";
        isValid = false;
    }

    if (password === "") {
        passwordError.innerText = "Mật khẩu không được để trống";
        isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
        passwordError.innerText = "Mật khẩu phải tối thiểu 8 ký tự, có chữ thường, chữ hoa và số";
        isValid = false;
    }

    if (!isValid) return;

    const existingBirthdays = users.map(u => u.birthday).filter(b => b); 
    const birthday = generateUniqueBirthday(existingBirthdays);

    let newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    let newUser = {
        id: newId,
        username: username,
        email: email,
        password: password,
        role: "USER",
        status: false,
        birthday: birthday,
        description: ""
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Đăng ký thành công!");
    window.location.href = "http://127.0.0.1:5500/pages/signin.html";
});

function generateUniqueBirthday(existingDates) {
    let birthday;
    do {
        const year = getRandomInt(1990, 2010);
        const month = getRandomInt(1, 12);
        const day = getRandomInt(1, 28); 
        birthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    } while (existingDates.includes(birthday));
    return birthday;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
