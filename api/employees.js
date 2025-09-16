import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

// GET /employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    console.log("DEBUG: getEmployees() returned:", employees);
    const formatted = employees.map((emp) => ({
      ...emp,
      birthday:
        emp.birthday instanceof Date
          ? emp.birthday.toISOString().slice(0, 10)
          : emp.birthday,
    }));
    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
});

// POST /employees
router.post("/", async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Missing request body" });
    }
    const { name, birthday, salary } = req.body;
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const employee = await createEmployee({ name, birthday, salary });
    const formatted = {
      ...employee,
      birthday:
        employee.birthday instanceof Date
          ? employee.birthday.toISOString().slice(0, 10)
          : employee.birthday,
    };
    res.status(201).json(formatted);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (
      !Number.isInteger(id) ||
      isNaN(id) ||
      req.params.id.includes("e") ||
      req.params.id.includes(".")
    ) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (id <= 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const employee = await getEmployee(id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const formatted = {
      ...employee,
      birthday:
        employee.birthday instanceof Date
          ? employee.birthday.toISOString().slice(0, 10)
          : employee.birthday,
    };
    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (
      !Number.isInteger(id) ||
      isNaN(id) ||
      req.params.id.includes("e") ||
      req.params.id.includes(".")
    ) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (id <= 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const deleted = await deleteEmployee(id);
    if (!deleted) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id
router.put("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Missing request body" });
    }
    const { name, birthday, salary } = req.body;
    if (
      !Number.isInteger(id) ||
      isNaN(id) ||
      req.params.id.includes("e") ||
      req.params.id.includes(".")
    ) {
      return res.status(400).json({ error: "Invalid id" });
    }
    if (id <= 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    if (!name || !birthday || !salary) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const updated = await updateEmployee({ id, name, birthday, salary });
    if (!updated) {
      return res.status(404).json({ error: "Employee not found" });
    }
    const formatted = {
      ...updated,
      birthday:
        updated.birthday instanceof Date
          ? updated.birthday.toISOString().slice(0, 10)
          : updated.birthday,
    };
    res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
});

export default router;
