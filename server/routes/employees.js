const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');

router.post('/', async (req, res) => {
    try {
        const existing = await Employee.findOne({
            employee_id: req.body.employee_id,
        });

        if (existing) {
            return res.status(409).json({message: 'Employee already exists'});
        }
        const employee = new Employee(req.body);
        await employee.save();

        return res.status(201).json(employee);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

module.exports = router;
