import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { deleteEmployee } from "../store/employeeSlice";
import ConfirmDialog from "../components/ConfirmDialog";

export default function EmployeeList() {
  const employees = useSelector((state) => state.employees.employees);

  // To dispatch actions to the Redux store
  const dispatch = useDispatch();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const router = useRouter();

  // State to check if the component has mounted on the client
  const [hasMounted, setHasMounted] = useState(false);

  // Set the flag to true when the component mounts
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render nothing on the server-side to avoid mismatches
  if (!hasMounted) {
    return null;
  }

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    // Dispatch the delete action
    dispatch(deleteEmployee(employeeToDelete));

    alert("Employee deleted successfully!");

    setIsDialogOpen(false);
    setEmployeeToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDialogOpen(false);
    setEmployeeToDelete(null);
  };

  return (
    <div>
      <h1>Employee List</h1>
      <div className="add-employee-link">
        <button onClick={() => router.push("/add")}>Add New Employee</button>
      </div>
      <div className="list-item">
        {/* Conditionally render the <ul> only when employees are available */}
        {employees.length > 0 && (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                {employee.name} - DOB: {employee.birthdate} -{" "}
                {employee.department} - {employee.experience} years
                <Link href={`/edit/${employee.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDeleteClick(employee.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this employee?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
