// Définissez le type pour un employé
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

// Définissez l'état initial du reducer
const initialState: Employee[] = []
// Dans votre reducer
const employeeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      const newEmployee = {
        ...action.payload,
      }
      return [...state, newEmployee]
    case "FAILURE_SAVE":
      return initialState
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

export default employeeReducer
