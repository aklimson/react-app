import { useEffect, useState } from "react";

function AssignmentTable() {
  const [assignments, setAssignments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const sortByDate = () => {
    const sorted = [...assignments].sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);

      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setAssignments(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

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
          <th onClick={sortByDate} style={{ cursor: "pointer" }}>
            Start Date {sortOrder === "asc" ? "↑" : "↓"}
          </th>
        </tr>
      </thead>

      <tbody>
        {assignments.map((assignment) => (
          <tr key={assignment._id}>
            <td>{assignment.employee.employee_id}</td>
            <td>{assignment.employee.full_name}</td>
            <td>{assignment.project.project_name}</td>
            <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AssignmentTable;
