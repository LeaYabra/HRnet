import List from "../features/employee/employee"
import { Link } from "react-router-dom"

function ListEmployee() {
  return (
    <div className="table">
      <h1> Current Employees</h1>
      <List />
      <Link className="linkHome" to="/">
        Home
      </Link>
    </div>
  )
}

export default ListEmployee
