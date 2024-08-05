import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addEmployee, editEmployee } from "../store/employeeSlice";
import ConfirmDialog from "../components/ConfirmDialog";

export default function EmployeeForm({ initialEmployee, isEditing }) {
  const [name, setName] = useState(initialEmployee?.name || "");
  const [birthdate, setBirthdate] = useState(initialEmployee?.birthdate || "");
  const [department, setDepartment] = useState(
    initialEmployee?.department || ""
  );
  const [experience, setExperience] = useState(
    initialEmployee?.experience || ""
  );

  // To dispatch actions to the Redux store
  const dispatch = useDispatch();

  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    const employeeData = {
      name,
      birthdate,
      department,
      experience: parseInt(experience),
    };

    if (isEditing) {
      dispatch(
        editEmployee({ id: initialEmployee.id, updatedEmployee: employeeData })
      );
      alert("Employee updated successfully!");
    } else {
      dispatch(addEmployee(employeeData));
      alert("Employee added successfully!");
    }

    setIsDialogOpen(false);
    router.push("/list");
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      <h1>{isEditing ? "Edit Employee" : "Add New Employee"}</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            pattern="[A-Za-z\s]+"
            required
          />
        </div>
        <div className="form-group">
          <label>Birthdate: </label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Department: </label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Experience: </label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isEditing ? "Update" : "Add"} Employee</button>
      </form>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title={isEditing ? "Confirm Update" : "Confirm Add"}
        message={`Are you sure you want to ${
          isEditing ? "update" : "add"
        } this employee?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
