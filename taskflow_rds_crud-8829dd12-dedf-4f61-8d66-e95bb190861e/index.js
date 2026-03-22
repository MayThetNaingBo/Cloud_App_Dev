const mysql = require("mysql");

const con = mysql.createConnection({
    host: "taskflow.ciwnljulowml.us-east-1.rds.amazonaws.com",
    user: "may",
    password: "mtnb2511",
    port: "3306",
    database: "taskflow_rds",
});

exports.handler = (event, context, callback) => {
    let sql;
    let body;
    context.callbackWaitsForEmptyEventLoop = false;

    // Ensuring the connection is established only once and reused
    if (con.state === "disconnected") {
        con.connect((err) => {
            if (err) {
                console.error("Connection error: ", err);
                return callback(err);
            }
            executeQuery();
        });
    }
    else {
        executeQuery();
    }

    function executeQuery() {
        switch (event.routeKey) {
            // Get all users
            case "GET /user":
                sql = "SELECT * FROM `user`;";
                con.query(sql, function(err, result) {
                    if (err) return callback(err);
                    return callback(null, result);
                });
                break;
                // Get User Group
            case "GET /user_group":
                sql = "SELECT * FROM `user_group`;";
                con.query(sql, function(err, result) {
                    if (err) return callback(err);
                    return callback(null, result);
                });
                break;
                // Get all groups

            case "GET /group":
                sql = "SELECT * FROM `group`;";
                con.query(sql, function(err, result) {
                    if (err) return callback(err);
                    return callback(null, result);
                });
                break;
                // Get all group tasks


            case "GET /grouptask":
                sql = "SELECT * FROM `group_tasks`;";
                con.query(sql, function(err, result) {
                    if (err) return callback(err);
                    return callback(null, result);
                });
                break;
                // Get group by user id


            case "GET /gp_by_user/{id}":
                sql = `
          SELECT u.user_name, g.group_id, g.group_description
          FROM user_group ug
          JOIN user u ON ug.user_id = u.user_id
          JOIN \`group\` g ON ug.group_id = g.group_id
          WHERE ug.user_id = ?;
        `;
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) return callback(err);
                        return callback(null, result);
                    }
                );
                break;

                // Get user by id
            case "GET /user/{id}":
                sql = "SELECT * FROM user WHERE user_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) return callback(err);
                        return callback(null, result);
                    }
                );
                break;
                // Get group by id

            case "GET /group/{id}":
                sql = "SELECT * FROM `group` WHERE group_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) return callback(err);
                        return callback(null, result);
                    }
                );
                break;
                // Get group by group task id
            case "GET /gp_by_gptask/{id}":
                sql = "SELECT * FROM `group` WHERE grouptask_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) return callback(err);
                        return callback(null, result);
                    }
                );
                break;
                // Get group task by id

            case "GET /grouptask/{id}":
                sql = "SELECT * FROM group_tasks WHERE grouptask_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) return callback(err);
                        return callback(null, result);
                    }
                );
                break;
                
                // Register user
            
                case "POST /user":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "INSERT INTO user (user_name, password) VALUES (?, ?);";
                    con.query(
                        sql,
                        [body.user_name, body.password],
                        function (err, result) {
                            if (err) {
                                console.error("Database query failed", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal Server Error: " + err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "User created successfully",
                                }),
                            });
                        }
                    );
                } catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
                // Login User


            case "POST /login":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "SELECT * FROM user WHERE user_name = ? AND password = ?;";
                    con.query(
                        sql,
                        [body.user_name, body.password],
                        function(err, result) {
                            if (err) {
                                console.error("Database query failed", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal Server Error: " +
                                            err.message,
                                    }),
                                });
                            }
                            if (result.length > 0) {
                                return callback(null, {
                                    statusCode: 200,
                                    body: JSON.stringify({
                                        message: "Login successful",
                                        user: result[0],
                                    }),
                                });
                            }
                            else {
                                return callback(null, {
                                    statusCode: 401,
                                    body: JSON.stringify({
                                        message: "Invalid username or password",
                                    }),
                                });
                            }
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
                // Add group
            case "POST /group":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "INSERT INTO `group` (group_id, grouptask_id, group_description) VALUES (?, ?, ?);";
                    con.query(
                        sql,
                        [
                            body.group_id,
                            body.grouptask_id,
                            body.group_description,
                        ],
                        function(err, result) {
                            if (err) {
                                console.error("Database query failed", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal Server Error: " +
                                            err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "Group created successfully",
                                }),
                            });
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;

                // Add group task
            case "POST /grouptask":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "INSERT INTO group_tasks (grouptask_id, gptask_description, gptask_deadline, gptask_status) VALUES (?, ?, ?, ?);";
                    con.query(
                        sql,
                        [
                            body.grouptask_id,
                            body.gptask_description,
                            body.gptask_deadline,
                            body.gptask_status,
                        ],
                        function(err, result) {
                            if (err) {
                                console.error("Database query failed", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal Server Error: " +
                                            err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "Group task created successfully",
                                }),
                            });
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
               
    
                               
                // Update user

            case "PUT /user/{id}":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "UPDATE user SET user_name = ?, password = ? WHERE user_id = ?;";
                    con.query(
                        sql,
                        [
                            body.user_name,
                            body.password,
                            event.pathParameters.id,
                        ],
                        function(err, result) {
                            if (err) {
                                console.error("Error executing query:", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal server error",
                                        error: err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "User updated successfully",
                                    result: result,
                                }),
                            });
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
                // Update group
            case "PUT /group/{id}":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "UPDATE `group` SET group_description = ? WHERE group_id = ?;";
                    con.query(
                        sql,
                        [body.group_description, event.pathParameters.id],
                        function(err, result) {
                            if (err) {
                                console.error("Error executing query:", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal server error",
                                        error: err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "Group updated successfully",
                                    result: result,
                                }),
                            });
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
                // Update group task
            case "PUT /grouptask/{id}":
                try {
                    body = JSON.parse(event.body);
                    sql =
                        "UPDATE group_tasks SET gptask_description = ?, gptask_deadline = ?, gptask_status = ? WHERE grouptask_id = ?;";
                    con.query(
                        sql,
                        [
                            body.gptask_description,
                            body.gptask_deadline,
                            body.gptask_status,
                            event.pathParameters.id,
                        ],
                        function(err, result) {
                            if (err) {
                                console.error("Error executing query:", err);
                                return callback(null, {
                                    statusCode: 500,
                                    body: JSON.stringify({
                                        message: "Internal server error",
                                        error: err.message,
                                    }),
                                });
                            }
                            return callback(null, {
                                statusCode: 200,
                                body: JSON.stringify({
                                    message: "Group task updated successfully",
                                }),
                            });
                        }
                    );
                }
                catch (parseErr) {
                    console.error("Failed to parse event body", parseErr);
                    return callback(null, {
                        statusCode: 400,
                        body: JSON.stringify({
                            message: "Bad Request: " + parseErr.message,
                        }),
                    });
                }
                break;
                // Delete user
            case "DELETE /user/{id}":
                sql = "DELETE FROM user WHERE user_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) {
                            console.error("Error executing query:", err);
                            return callback(null, {
                                statusCode: 500,
                                body: JSON.stringify({
                                    message: "Internal server error",
                                    error: err.message,
                                }),
                            });
                        }
                        return callback(null, {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: "User deleted successfully",
                                result: result,
                            }),
                        });
                    }
                );
                break;
                // Delete group
            case "DELETE /group/{id}":
                sql = "DELETE FROM `group` WHERE group_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) {
                            console.error("Error executing query:", err);
                            return callback(null, {
                                statusCode: 500,
                                body: JSON.stringify({
                                    message: "Internal server error",
                                    error: err.message,
                                }),
                            });
                        }
                        return callback(null, {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: "Group deleted successfully",
                                result: result,
                            }),
                        });
                    }
                );
                break;
                // Delete group task
            case "DELETE /grouptask/{id}":
                sql = "DELETE FROM group_tasks WHERE grouptask_id = ?;";
                con.query(
                    sql,
                    [event.pathParameters.id],
                    function(err, result) {
                        if (err) {
                            console.error("Error executing query:", err);
                            return callback(null, {
                                statusCode: 500,
                                body: JSON.stringify({
                                    message: "Internal server error",
                                    error: err.message,
                                }),
                            });
                        }
                        return callback(null, {
                            statusCode: 200,
                            body: JSON.stringify({
                                message: "Group task deleted successfully",
                                result: result,
                            }),
                        });
                    }
                );
                break;

            default:
                return callback(null, {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: "Unsupported route: " + event.routeKey,
                    }),
                });
        }
    }
};
