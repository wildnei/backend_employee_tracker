var mysql = require("mysql");
var express = require("express");
var inquirer = require("inquirer");
const cTable = require("console.table");
const { response } = require("express");

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
    initialize();
});



//function to initialize application
function initialize() {
    inquirer.prompt({
        type: "list",
        name: "start",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Departments", "View All Roles", "View All Employees By Department", "View All Employees By Manager",
            "Add Employee", "Remove Employee", "Update Employee Role", "Add Employee Role", "Remove Role", "Add New Department", "Remove Department"]
    })
        .then(function (response) {
            switch (response.start) {

                case "View All Employees":
                    displayEmployees();
                    break;

                case "View All Departments":
                    viewDepartments();
                    break;

                case "View All Roles":
                    viewRoles();
                    break;

                case "View All Employees By Department":
                    displayEmByDep();
                    break;

                case "View All Employees By Manager":
                    displayEmByManager();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;

                case "Add Employee Role":
                    addRole();
                    break;

                case "Remove Role":
                    removeRole();
                    break;

                case "Add New Department":
                    addDepartment();
                    break;

                case "Remove Department":
                    removeDept();
                    break;

                case "Update Employee Manager":
                    updateEmpManager();
                    break;
            }
        })
};
