const express = require('express');
const router = express.Router();

const Project = require('../models/Project');

router.post('/', async (req, res) => {
    try {
        const existing = await Project.findOne({
            project_code: req.body.project_code,
        });

        if (existing) {
            return res.status(409).json({ message: 'Project already exists' });
        }

        const project = new Project(req.body);
        await project.save();

        return res.status(201).json(project);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;
