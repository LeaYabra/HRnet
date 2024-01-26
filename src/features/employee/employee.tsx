// EmployeeListPage.tsx
import { useSelector } from "react-redux"
import { Employee } from "./reducer"
import { selectEmployees } from "./selector"

const EmployeeListPage: React.FC = () => {
  const employees: Employee[] = useSelector(selectEmployees)
  return (
    <div>
      <h2>Liste des employés</h2>
      <ul>
        {employees.map((employee: Employee, index: number) => (
          <li key={index}>
            {employee.firstName} {employee.lastName} - {employee.department}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EmployeeListPage
