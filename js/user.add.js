document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".user-form");
    const inputs = form.querySelectorAll("input, select, textarea");

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const codeInput = inputs[0];
    let newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    codeInput.value = `US${String(newId).padStart(3, '0')}`;
    codeInput.disabled = true;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = inputs[1].value.trim();
        const email = inputs[2].value.trim();
        const password = inputs[3].value.trim();
        const role = inputs[4].value;
        const birthday = inputs[5].value;
        const statusValue = form.querySelector("input[name='status']:checked")?.value;
        const status = statusValue === "on";
        const description = inputs[7].value.trim();
        const fullname = inputs[0].value.trim();

        let errors = [];

        if (!fullname) errors.push("Please enter your full name.");
        if (!username) {
            errors.push("Please enter your username.");
        } else if (users.some(u => u.username === username)) {
            errors.push("Username already exists.");
        }

        if (!email) {
            errors.push("Please enter your email.");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)) {
            errors.push("Please enter your email.");
        } else if (users.some(u => u.email === email)) {
            errors.push("Email already exists.");
        }

        if (!password) {
            errors.push("Please enter your password.");
        } else if (password.length < 8) {
            errors.push("Password must be at least 8 characters.");
        }

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }

        const newUser = {
            id: newId,
            username,
            email,
            password,
            role,
            status,
            birthday,
            description
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("User created successfully!");
        window.location.href = "user.html";
    });
});
