import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import EmployeeForm from "../../components/EmployeeForm";

export default function EditEmployee() {
  // Access the employees from the Redux store
  const employees = useSelector((state) => state.employees.employees);
  const router = useRouter();
  const { id } = router.query;
  const [initialEmployee, setInitialEmployee] = useState(null);

  // Find the employee with the matching id
  useEffect(() => {
    if (id && employees.length > 0) {
      const employee = employees.find((emp) => emp.id === parseInt(id));
      if (employee) {
        setInitialEmployee(employee);
      }
    }
  }, [id, employees]);

  if (!initialEmployee) return <div>Employee Not Found</div>;

  return <EmployeeForm initialEmployee={initialEmployee} isEditing={true} />;
}
