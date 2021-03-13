//TODO Fix Select Manager by Employee 
//TODO Fix adding empty manager role not being equal to "null" (inside add employee)
//TODO Find a way to display all employees before prompting to choose the manager


var mysql = require("mysql");
var express = require("express");
var inquirer = require("inquirer");
const cTable = require("console.table");
// const { response } = require("express");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@477928596@",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId);
    initialLog()
    init();
});

function initialLog() {
        console.log(` \u001b[33;1m
    

███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

 ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ████████╗ ██████╗ ██████╗
██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔═══██╗██╔══██╗
██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║   ██║   ██║   ██║██████╔╝
██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║   ██║   ██║   ██║██╔══██╗
╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║   ██║   ╚██████╔╝██║  ██║
 ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝

    
    `);
};

function init() {
    inquirer.prompt({
        type: "list",
        name: "start",
        message: "Select one of the options",
        choices: ["\u001b[34;1m View All Employees", "\u001b[34;1m View All Roles", "\u001b[34;1m View All Departments", "\u001b[34;1m View All Employees By Department",
        "\u001b[34;1m View All Employees By Manager",
            "\u001b[1;33m Add Employee", "\u001b[1;31m Remove Employee", "\u001b[1;32m Update Employee Role", "\u001b[1;33m Add Employee Role",
            "\u001b[1;31m Remove Role", "\u001b[1;33m Add New Department", "\u001b[1;31m Remove Department", new inquirer.Separator('*******************') ]
    })
        .then(function (response) {
            switch (response.start) {

                case "\u001b[34;1m View All Employees":
                    displayEmployees();
                    break;

                case "\u001b[34;1m View All Departments":
                    viewDepartments();
                    break;

                case "\u001b[34;1m View All Roles":
                    viewRoles();
                    break;

                case "\u001b[34;1m View All Employees By Department":
                    displayEmployeeByDep();
                    break;

                case "\u001b[34;1m View All Employees By Manager":
                    displayEmByManager();
                    break;

                case "\u001b[1;33m Add Employee":
                    addEmployee();
                    break;

                case "\u001b[1;31m Remove Employee":
                    removeEmployee();
                    break;

                case "\u001b[1;32m Update Employee Role":
                    updateEmpRole();
                    break;

                case "\u001b[1;33m Add Employee Role":
                    addRole();
                    break;

                case "\u001b[1;31m Remove Role":
                    removeRole();
                    break;

                case "\u001b[1;33m Add New Department":
                    addDepartment();
                    break;

                case "\u001b[1;31m Remove Department":
                    removeDept();
                    break;
            }
        })
};



function displayEmployees() {
    const emQuery = `SELECT e.id, e.first_name, e.last_name,r.title, d.name as department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name)as manager FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    INNER JOIN role r ON e.role_id = r.id
    INNER JOIN department d ON r.department_id = d.id`

    connection.query(emQuery, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
};

function viewDepartments() {
    const viewDepartmentQuery = `SELECT * FROM department`
    connection.query(viewDepartmentQuery, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
};

function viewRoles() {
    const roleQuery = `SELECT * FROM role`
    connection.query(roleQuery, (err, data) => {
        if (err) throw err;
        console.table(data);
        init();
    })
};

//function to display employees by department//
function displayEmployeeByDep() {
    const departmentQuery = ("SELECT * FROM department");

    connection.query(departmentQuery, (err, response) => {
        if (err) throw err;
        const departments = response.map(element => {
            return { name: `${element.name}` }
        });

        inquirer.prompt([{
            type: "list",
            name: "department",
            message: "Select a department to view employees",
            choices: departments

        }]).then(answer => {
            const departmentQuery2 = `SELECT e.first_name, e.last_name, e.role_id AS role, CONCAT(m.first_name,' ',m.last_name) 
                AS manager, d.name as department FROM employee e
                LEFT JOIN role r on e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                LEFT JOIN employee m ON e.manager_id = m.id
                WHERE ?`
            connection.query(departmentQuery2, [{ name: answer.department }], function (err, res) {
                if (err) throw err;
                console.table(res)
                init();
            })
        })
    })
};

//function to display employees by manager//
function displayEmByManager() {
    let displayManagerQuery = ` 
    SELECT e.first_name, e.last_name,r.title, d.name as department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name)as manager FROM employee e
    LEFT JOIN employee m ON e.manager_id = m.id
    INNER JOIN role r ON e.role_id = r.id
    INNER JOIN department d ON r.department_id = d.id
    AND e.manager_id IS NOT NULL`

    connection.query(displayManagerQuery, function (err, res) {
        console.log(res);
        if (err) throw err;
        const managers = res.map(function (element) {
            return {
                name: `${element.manager}`,
                value: element.id
            }
        });
        inquirer.prompt([{
            type: "list",
            name: "emByManager",
            message: "Please select manager to view employees",
            choices: managers
        }])
            .then(response => {
                console.log(response.emByManager)
                let query2 = `
                    SELECT * FROM employee WHERE manager = ${managers};`
                connection.query(query2, [response.emByManager], (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    init()
                })
            })
    })
};

function addEmployee() {
    let addQuery = `SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, role.title, department.name,
    role.salary, employee.manager_id 
    FROM employee INNER JOIN role on role.id = employee.role_id
    INNER JOIN department ON department.id = role.department_id`
    connection.query(addQuery, (err, results) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "Please enter employee first name",
                validate: (name) => {
                    if (!/^[aA-zZ]+$/gi.test(name)) {
                        return "Please enter text only...";
                    }
                    return true;
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "Please enter employee last name",
                validate: (name) => {
                    if (!/^[aA-zZ]+$/gi.test(name)) {
                        return "Please enter text only...";
                    }
                    return true;
                }
            },

            {
                type: "list",
                name: "role",
                message: "Please select employee title",
                choices: results.map(role => {
                    return { name: role.title, value: role.role_id }
                }),
            }, 
            
            {
                type: "input",
                name: "manager",
                message: "Please enter employee manager id"
            }])
            .then(answer => {
                console.log(answer);
                connection.query(
                    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                    [answer.first_name, answer.last_name, answer.role, answer.manager],
                    function (err) {
                        if (err) throw err
                        console.log(`${answer.first_name} ${answer.last_name} added as a new employee`)
                        init();
                    })
            })
    })
};

function removeEmployee() {
    let query1 = `SELECT * FROM employee`
    connection.query(query1, (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            name: "employeeId",
            message: "Please select employee to remove",
            choices: res.map(employee => {
                return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id }
            })
        }])
            .then(answer => {
                let query2 = `DELETE FROM employee WHERE ?`
                connection.query(query2, [{ id: answer.employeeId }], (err) => {
                    if (err) throw err;
                    console.log("Employee removed");
                    init();
                })
            })
    })
};

function removeRole() {
    let query1 = `SELECT * FROM role`
    connection.query(query1, (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            name: "roleId",
            message: "Please select role to remove",
            choices: res.map(roles => {
                return { name: `${roles.title}`, value: roles.id }
            })
        }])
            .then(answer => {
                let query2 = `DELETE FROM role WHERE ?`
                connection.query(query2, [{ id: answer.roleId }], (err) => {
                    if (err) throw err;
                    console.log("Role removed");
                    init();
                })
            })
    })
};

function updateEmpRole() {
    let query = ("SELECT * FROM employee");

    connection.query(query, (err, response) => {

        const employees = response.map(function (element) {
            return {
                name: `${element.first_name} ${element.last_name}`,
                value: element.id
            }
        });

        inquirer.prompt([{
            type: "list",
            name: "employeeId",
            message: "Which employees role do you want to update",
            choices: employees
        }])
            .then(input1 => {
                connection.query("SELECT * FROM role", (err, data) => {

                    const roles = data.map(function (role) {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    });

                    inquirer.prompt([{
                        type: "list",
                        name: "roleId",
                        message: "What's the new role",
                        choices: roles
                    }])
                        .then(input2 => {
                            const query1 = `\
                            UPDATE employee
                            SET employee.role_id = ? 
                            WHERE employee.id = ?`
                            connection.query(query1, [input2.roleId, input1.employeeId], function (err, res) {
                                var tempPosition;
                                // will return the updated position
                                for (var i = 0; k < roles.length; i++) {
                                    if (roles[i].value == input2.roleId) {
                                        tempPosition = roles[i].name;
                                    }
                                }
                                // will return the employee
                                var tempName;
                                for (var g = 0; g < employees.length; g++) {
                                    if (employees[g].value == input1.employeeId) {
                                        tempName = employees[g].name;
                                    }
                                }

                                if (res.changedRows === 1) {
                                    console.log(`Successfully updated ${tempName} to position of ${tempPosition}`);
                                } else {
                                    console.log(`Error: ${tempName}'s current position is ${tempPosition}`)
                                }
                                // console.log(res.changedRows);
                                init();
                            })
                        })
                })
            })
    })
};

//function to add a new role
function addRole() {
    let query1 = `SELECT * FROM role`
    connection.query(query1, (err, data) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                name: "roleId",
                message: "Please enter id for new role",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Please enter numbers only...";
                    }
                    return true;
                }
                
            }, {
                type: "input",
                name: "role",
                message: "Please enter title of new role",
            }, {
                type: "input",
                name: "salary",
                message: "Please enter salary for new role",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Please enter numbers only...";
                    }
                    return true;
                }
            }, {
                type: "input",
                name: "deptId",
                message: "Please enter department id for new role",
                validate: val => {
                    if (!/^[0-9]+$/gi.test(val)) {
                        return "Please enter numbers only...";
                    }
                    return true;
                }
            }])
            .then(function (answers) {
                let query2 = `INSERT INTO role VALUES (?,?,?,?)`
                connection.query(query2, [answers.roleId, answers.role, answers.salary, answers.deptId], function (err) {
                    if (err) throw err;
                    console.log(`${answers.role} added as new role`)
                    init();
                })
            })
    })
}

//function to add new department
function addDepartment() {
    let query1 = `SELECT * FROM department`
    connection.query(query1, (err, res) => {
        if (err) throw err
        inquirer.prompt([{
            type: "input",
            name: "deptId",
            message: "Please enter id for new department",
            validate: val => {
                if (!/^[0-9]+$/gi.test(val)) {
                    return "Please enter numbers only...";
                }
                return true;
            }
        }, {
            type: "input",
            name: "deptName",
            message: "Please enter name for new department",
            validate: (name) => {
                if (!/^[aA-zZ]+$/gi.test(name)) {
                    return "Please enter text only...";
                }
                return true;
            }
        }])
            .then(answers => {
                let query2 = `INSERT INTO department VALUES (?,?)`
                connection.query(query2, [answers.deptId, answers.deptName], (err) => {
                    if (err) throw err
                    console.log(`${answers.deptName} added as a new department`)
                    init();
                })
            })
    })
};

function removeDept() {
    let query1 = `SELECT * FROM department`
    connection.query(query1, (err, res) => {
        if (err) throw err;
        inquirer.prompt([{
            type: "list",
            name: "deptId",
            message: "Please select a department to remove",
            choices: res.map(departments => {
                return { name: `${departments.name}`, value: departments.id }
            })
        }])
            .then(answer => {
                let query2 = `DELETE FROM department WHERE ?`
                connection.query(query2, [{ id: answer.deptId }], (err) => {
                    if (err) throw err;
                    console.log("Department removed")
                    init();
                })
            })
    })
};