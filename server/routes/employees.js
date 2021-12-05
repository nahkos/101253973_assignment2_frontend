import express from "express";

import {getEmployees, createEmployee, getEmployee,deleteEmployee, updateEmployee} from "../controllers/employees.js"

const router = express.Router();

router.get("/employees", getEmployees)
router.post("/employee", createEmployee)
router.get("/employee/:id", getEmployee)
router.delete("/employee/:id", deleteEmployee)
router.put("/employee/:id", updateEmployee)

export default router;