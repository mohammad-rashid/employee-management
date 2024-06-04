import { useState } from "react";
import { useRouter } from "next/router";
import { useEmployees } from "../context/EmployeeContext";

export default function AddEmployee() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const { addEmployee } = useEmployees();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    addEmployee({
      name,
      birthdate,
      department,
      experience: parseInt(experience),
    });
    router.push("/list");
  };

  return (
    <div>
      <h1>Add New Employee</h1>
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
        <div>
          <button type="submit">Add Employee</button>
        </div>
      </form>
    </div>
  );
}
