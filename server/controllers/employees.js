import {v4 as uuid} from "uuid";

// create array because not import from mongodb
let employees = [];

export const getEmployees = (req, res) => {
    res.send(employees);
}

export const createEmployee = (req, res) => {
    const employee = req.body;
    employees.push({...employee, id: uuid()});
    res.send("Employee Added Successfully");
};

export const getEmployee = (req, res) => {
    const singleEmployee = employees.filter((employee) => employee.id === req.params.id);
    res.send(singleEmployee);
};

export const deleteEmployee = (req, res) => {
    employees = employees.filter((employee) => employee.id !== req.params.id);
    res.send("Employee Deleted Successfully")
}

export const updateEmployee = (req, res) => {
    const employee = employees.find((employee) => employee.id === req.params.id);

    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.emailId = req.body.emailId;

    res.send("Employee Updated Successfully")
}