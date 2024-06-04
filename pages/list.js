import Link from "next/link";
import { useRouter } from "next/router";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeList() {
  const { employees, deleteEmployee } = useEmployees();
  const router = useRouter();

  return (
    <div>
      <h1>Employee List</h1>
      <div class="add-employee-link">
        <button onClick={() => router.push("/add")}>Add New Employee</button>
      </div>
      <div class="list-item">
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - {employee.department} - {employee.experience}{" "}
              years
              <Link href={`/edit/${employee.id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => deleteEmployee(employee.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
