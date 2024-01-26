// type pour un employé
export interface Employee {
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  startDate: Date | null
  department: string
  street: string
  city: string
  states: string | null
  zipCode: number | null
}

export interface EmployeeState {
  employees: Employee[]
}

const initialState: EmployeeState = {
  employees: [],
}

const employeeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SAVE_EMPLOYEE":
      const newEmployee = {
        ...action.payload,
      }
      return { ...state, employees: [...state.employees, newEmployee] }
    case "FAILURE_SAVE":
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

export default employeeReducer
