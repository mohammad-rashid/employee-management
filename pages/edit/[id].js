import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useEmployees } from "../../context/EmployeeContext";

export default function EditEmployee() {
  const { employees, editEmployee } = useEmployees();
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    const employee = employees.find((emp) => emp.id === parseInt(id));
    if (employee) {
      setName(employee.name);
      setBirthdate(employee.birthdate);
      setDepartment(employee.department);
      setExperience(employee.experience);
    }
  }, [id, employees]);

  const handleSubmit = (e) => {
    e.preventDefault();
    editEmployee(parseInt(id), {
      name,
      birthdate,
      department,
      experience: parseInt(experience),
    });
    router.push("/list");
  };

  return (
    <div>
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <div class="form-group">
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="[A-Za-z\s]+"
              required
            />
          </div>
          <div class="form-group">
            <label>Birthdate: </label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label>Department: </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <label>Experience: </label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}
