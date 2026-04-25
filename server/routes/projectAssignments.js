const express = require('express');
const router = express.Router();

require('../models/Employee');
require('../models/Project');

const ProjectAssignment = require('../models/ProjectAssignment');

router.post('/', async (req, res) => {
    try {
        const assignment = new ProjectAssignment(req.body);
        await assignment.save();
        return res.status(201).json(assignment);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
            .populate('employee')
            .populate('project');
        return res.json(assignments);
    } catch (err) {
        return res.status(500).json({error: err.message});
    }
})

module.exports = router;