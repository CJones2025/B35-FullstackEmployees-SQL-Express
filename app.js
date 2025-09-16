import express from "express";
import employeesRouter from "#api/employees";

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Fullstack Employees API.");
});

// Employees API router
app.use("/api/employees", employeesRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

export default app;
