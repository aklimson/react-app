import { useEffect, useState } from "react";

function AssignmentTable() {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/project-assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <table
      border="1"
      cellPadding="10"
      style={{ borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Project Name</th>
          <th>Start Date</th>
        </tr>
      </thead>

      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment._id}>
            <td>{assignment.employee.employee_id}</td>
            <td>{assignment.employee.full_name}</td>
            <td>{assignment.project.project_name}</td>
            <td>
              {new Date(assignment.start_date).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssignmentTable;
