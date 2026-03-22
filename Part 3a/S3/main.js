function addTask() {
    var gptask_status = document.getElementById("gptask_status").value;
    var gptask_description =
        document.getElementById("gptask_description").value;
    var gptask_deadline = document.getElementById("gptask_deadline").value;

    if (!gptask_status || !gptask_description || !gptask_deadline) {
        alert("You must fill out all fields.");
        return;
    }

    var task = {
        gptask_status: gptask_status,
        gptask_description: gptask_description,
        gptask_deadline: gptask_deadline,
    };

    var request = new XMLHttpRequest();
    request.open(
        "POST",
        "https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/grouptask",
        true
    );
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            alert("Task added successfully!");
            window.location.href = "index.html";
        } else {
            alert("Failed to add task: " + request.statusText);
        }
    };

    request.onerror = function () {
        alert("Network error. Please check your connection and try again.");
    };

    request.send(JSON.stringify(task));
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
}

function getTask() {
    var request = new XMLHttpRequest();

    request.open(
        "GET",
        "https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/grouptask",
        true
    );

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var response = JSON.parse(request.responseText);
            var html = "";

            for (var i = 0; i < response.length; i++) {
                const formattedDate = formatDate(response[i].gptask_deadline);
                html +=
                    '<div class="col-md-4">' +
                    '<div class="card mb-4 shadow-sm">' +
                    '<div class="card-body">' +
                    '<h5 class="card-title">' +
                    (response[i].gptask_description || "No description") +
                    "</h5>" +
                    '<p class="card-text">' +
                    (formattedDate || "No deadline") +
                    "</p>" +
                    '<p class="card-text">' +
                    (response[i].gptask_status || "No status") +
                    "</p>" +
                    "<button onclick=\"setTaskIdAndNavigate('" +
                    response[i].grouptask_id +
                    '\')" class="btn btn-primary">Edit</button>' +
                    "<button onclick=\"confirmDelete('" +
                    response[i].grouptask_id +
                    '\')" class="btn btn-danger ml-2">Delete</button>' +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }

            document.getElementById("taskList").innerHTML = html;
        } else {
            console.error(
                "Failed to fetch data from the API",
                request.statusText
            );
        }
    };

    request.onerror = function () {
        console.error("Request failed");
    };

    request.send();
}

function setTaskIdAndNavigate(gptask_id) {
    localStorage.setItem("gptask_id", gptask_id);
    window.location.href = "update_task.html";
}

function loadTask() {
    const gptask_id = localStorage.getItem("gptask_id");
    if (!gptask_id) {
        alert("No task ID provided");
        return;
    }

    var request = new XMLHttpRequest();
    request.open(
        "GET",
        `https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/grouptask/${gptask_id}`,
        true
    );

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var task = JSON.parse(request.responseText);
            document.getElementById("gptask_description").value =
                task.gptask_description || "";
            document.getElementById("gptask_deadline").value =
                task.gptask_deadline
                    ? new Date(task.gptask_deadline)
                          .toISOString()
                          .substring(0, 10)
                    : "";
            document.getElementById("gptask_status").value =
                task.gptask_status || "";
        } else {
            console.error("Failed to load task data", request.statusText);
        }
    };

    request.onerror = function () {
        console.error("Request failed");
    };

    request.send();
}

function updateTask() {
    const gptask_id = localStorage.getItem("gptask_id");
    if (!gptask_id) {
        alert("No task ID provided");
        return;
    }

    var gptask_status = document.getElementById("gptask_status").value;
    var gptask_description =
        document.getElementById("gptask_description").value;
    var gptask_deadline = document.getElementById("gptask_deadline").value;

    var updatedTask = {
        gptask_status: gptask_status,
        gptask_description: gptask_description,
        gptask_deadline: gptask_deadline,
    };

    var request = new XMLHttpRequest();
    request.open(
        "PUT",
        `https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/grouptask/${gptask_id}`,
        true
    );
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            alert("Task updated successfully!");
            window.location.href = "index.html";
        } else {
            alert("Failed to update task: " + request.statusText);
            console.error("Server Error:", request.responseText);
        }
    };

    request.onerror = function () {
        alert("Network error. Please check your connection and try again.");
    };

    request.send(JSON.stringify(updatedTask));
}

function confirmDelete(gptask_id) {
    if (confirm("Are you sure you want to delete this task?")) {
        deleteTask(gptask_id);
    }
}

function deleteTask(gptask_id) {
    var request = new XMLHttpRequest();
    request.open(
        "DELETE",
        `https://6z9boxpal7.execute-api.us-east-1.amazonaws.com/grouptask/${gptask_id}`,
        true
    );

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            alert("Task deleted successfully!");
            window.location.href = "index.html";
        } else {
            alert("Failed to delete task: " + request.statusText);
        }
    };

    request.onerror = function () {
        alert("Network error. Please check your connection and try again.");
    };

    request.send();
}
