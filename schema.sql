DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

DROP TABLE IF EXISTS department;

CREATE TABLE department(
    id INT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS role;

CREATE TABLE role(
    id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS employee;

CREATE TABLE employee(
    id INT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);



module.exports('schema')