require("dotenv").config({ path: "./server/.env" });

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Employee = require("./models/Employee");
const Project = require("./models/Project");
const ProjectAssignment = require("./models/ProjectAssignment");

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL);
    console.log("MongoDB connected");

    await Employee.deleteMany({});
    await Project.deleteMany({});
    await ProjectAssignment.deleteMany({});

    const plainPasswords = ["alice123", "bob123", "charlie123", "dana123", "eli123"];

    const hashedPasswords = await Promise.all(
      plainPasswords.map((password) => bcrypt.hash(password, 10))
    );

    const employees = await Employee.insertMany([
      {employee_id: "E001", full_name: "Deema Aloom", email: "alice@example.com", hashed_password: hashedPasswords[0],},
      {employee_id: "E002", full_name: "Bob Bashir", email: "bob@example.com",hashed_password: hashedPasswords[1],},
      {employee_id: "E003", full_name: "Charlie Chen", email: "charlie@example.com", hashed_password: hashedPasswords[2],},
      {employee_id: "E004", full_name: "Dana D", email: "dana@example.com", hashed_password: hashedPasswords[3],},
      {employee_id: "E005", full_name: "Eli Ekström", email: "eli@example.com", hashed_password: hashedPasswords[4],},
    ]);

    const projects = await Project.insertMany([
      {project_code: "P001", project_name: "AI Dashboard", project_description: "Visualizes AI data",},
      {project_code: "P002", project_name: "Chatbot Dev", project_description: "Customer service assistant",},
      {project_code: "P003", project_name: "IoT Monitor", project_description: "Monitors IoT devices",},
      {project_code: "P004", project_name: "E-Learning", project_description: "Online learning platform",},
      {project_code: "P005", project_name: "DataViz Pro", project_description: "Data visualization tool",},
    ]);

    await ProjectAssignment.insertMany([
      {employee: employees[0]._id, project: projects[0]._id, start_date: new Date("2025-03-01"),},
      {employee: employees[1]._id, project: projects[1]._id, start_date: new Date("2025-03-05"),},
      {employee: employees[2]._id, project: projects[2]._id, start_date: new Date("2025-03-10"),},
      {employee: employees[3]._id, project: projects[3]._id, start_date: new Date("2025-03-15"),},
      {employee: employees[4]._id, project: projects[4]._id, start_date: new Date("2025-03-20"),},
    ]);

    console.log("Database seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
