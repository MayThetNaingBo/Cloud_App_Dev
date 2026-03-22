// Function to handle user registration
function registerUser() {
    var jsonData = {
        name: document.getElementById("uname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("psw").value,
        confirmPassword: document.getElementById("confirmPsw").value,
    };

    // Validation
    if (Object.values(jsonData).some((value) => value === "")) {
        alert("All fields are required!");
        return;
    }

    if (jsonData.password !== jsonData.confirmPassword) {
        alert("Password and confirm password must be the same!");
        return;
    }

    var request = new XMLHttpRequest();
    request.open(
        "POST",
        "https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/user",
        true
    );
    request.setRequestHeader("Content-Type", "application/json");
    let alertShown = false;

    request.onload = function () {
        if (!alertShown) {
            var response = JSON.parse(request.responseText);
            if (response.message === "User created successfully") {
                alert("Registration successful! You can now log in.");
                window.location.href = "login.html"; // Redirect to login page
            } else {
                alert("Error. Unable to register user.");
            }
            alertShown = true;
        }
    };

    request.onerror = function () {
        console.error("Request failed");
    };

    request.send(
        JSON.stringify({
            user_name: jsonData.name,
            password: jsonData.password,
        })
    );
}

// Validate passwords
function validatePasswords() {
    const psw = document.getElementById("psw").value;
    const confirmPsw = document.getElementById("confirmPsw").value;
    if (psw !== confirmPsw) {
        alert("Passwords do not match!");
        return false;
    }
    return true;
}

// Toggle password visibility
function togglePasswordVisibility() {
    const psw = document.getElementById("psw");
    const confirmPsw = document.getElementById("confirmPsw");
    const showPassword = document.getElementById("showPassword");

    if (showPassword.checked) {
        psw.type = "text";
        confirmPsw.type = "text";
    } else {
        psw.type = "password";
        confirmPsw.type = "password";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("registerForm")) {
        document
            .getElementById("registerForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();
                registerUser();
            });
    }

    if (document.getElementById("loginForm")) {
        document
            .getElementById("loginForm")
            .addEventListener("submit", function (event) {
                event.preventDefault();
                user_login();
            });
    }
});
function user_login() {
    var jsonData = {
        user_name: document.getElementById("uname").value,
        password: document.getElementById("psw").value,
    };

    if (jsonData.user_name === "" || jsonData.password === "") {
        alert("All fields are required!");
        return;
    }

    var request = new XMLHttpRequest();
    request.open(
        "POST",
        "https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/login",
        true
    );
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        console.log("Request status:", request.status);
        console.log("Request response:", request.responseText);

        var response = JSON.parse(request.responseText);

        if (request.status === 200) {
            if (response.message === "Login successful") {
                sessionStorage.setItem("psw", jsonData.password);
                alert("Login successful!");
                window.location.href = "index.html";
            } else {
                alert("Error. Unable to login.");
            }
        } else if (request.status === 401) {
            alert("Incorrect name or password.");
        } else {
            alert("Server returned an error. Status: " + request.status);
        }
    };

    request.onerror = function () {
        alert("Request failed. Please check your connection.");
    };

    request.send(JSON.stringify(jsonData));
}

function user_logout() {
    // Clear session storage
    sessionStorage.clear();

    // Optionally, clear local storage if you store anything there
    localStorage.clear();

    // Redirect to the login page or home page
    window.location.href = "login.html";
}

// Existing event listeners and other code...
