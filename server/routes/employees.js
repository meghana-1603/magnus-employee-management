
const express = require("express");
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

const router = express.Router();

// READ: list employees, search by name/mobile, and paginate
router.get("/", async (req, res) => {
  try {
    const { name = "", mobile = "", page = 1, limit = 10 } = req.query;

    const safePage = Math.max(1, Number.parseInt(page, 10) || 1);
    const safeLimit = Math.min(
      100,
      Math.max(1, Number.parseInt(limit, 10) || 10)
    );

    const filter = {};

    if (name.trim()) {
      const escapedName = name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { firstName: { $regex: escapedName, $options: "i" } },
        { lastName: { $regex: escapedName, $options: "i" } },
      ];
    }

    if (mobile.trim()) {
      filter.mobileNumber = { $regex: mobile.trim(), $options: "i" };
    }

    const [employees, total] = await Promise.all([
      Employee.find(filter)
        .sort({ createdAt: -1 })
        .skip((safePage - 1) * safeLimit)
        .limit(safeLimit),
      Employee.countDocuments(filter),
    ]);

    res.json({
      employees,
      total,
      page: safePage,
      totalPages: Math.ceil(total / safeLimit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employees." });
  }
});

// READ: get one employee
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID." });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve employee." });
  }
});

// CREATE: add employee
router.post("/", async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json({
      message: "Employee created successfully.",
      employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An employee with this email already exists.",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to create employee." });
  }
});

// UPDATE: edit employee
router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID." });
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.json({
      message: "Employee updated successfully.",
      employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An employee with this email already exists.",
      });
    }

    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Failed to update employee." });
  }
});

// DELETE: remove employee
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid employee ID." });
    }

    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete employee." });
  }
});

module.exports = router;
