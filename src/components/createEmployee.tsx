import CustomForm from "../features/form/form"
function CreateEmployee() {
  return (
    <div className="form">
      <a className="linkList" href="/list">
        View Current Employees
      </a>
      <h2>Create Employee</h2>
      <CustomForm />
    </div>
  )
}

export default CreateEmployee
