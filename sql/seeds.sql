/* example */


USE employee_DB;

/* Insert 3 Rows into your new table */
INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Fullstack Software Engineer", 150000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("CEO", 300000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 50000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Widnei", 'queiroz', 1, NULL);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;