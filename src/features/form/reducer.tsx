export interface FormState {
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

export const initialState: FormState = {
  firstName: "",
  lastName: "",
  dateOfBirth: null,
  startDate: null,
  department: "",
  street: "",
  city: "",
  states: null,
  zipCode: null,
}

const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SAVE_EMPLOYEE":
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        dateOfBirth: action.payload.dateOfBirth,
        startDate: action.payload.startDate,
        department: action.payload.department,
        street: action.payload.street,
        city: action.payload.city,
        states: action.payload.states,
        zipCode: action.payload.zipCode,
      }
    case "FAILURE_SAVE":
      return {
        ...state,
        firstName: "",
        lastName: "",
        dateOfBirth: null,
        startDate: null,
        department: "",
        street: "",
        city: "",
        states: [],
        zipCode: "",
      }
    case "RESET_FORM":
      return initialState
    default:
      return state
  }
}

export default formReducer
