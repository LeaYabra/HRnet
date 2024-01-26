import CustomForm from "../features/form/form"
import { Link } from "react-router-dom"
function CreateEmployee() {
  return (
    <div className="form">
      <Link className="linkList" to="/List">
        View Current Employees
      </Link>
      <h2>Create Employee</h2>
      <CustomForm />
    </div>
  )
}

export default CreateEmployee
