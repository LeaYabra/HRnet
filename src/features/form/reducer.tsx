export interface FormState {
  success: boolean
  error: string | null
  firstName: string
  lastName: string
  dateOfBirth: Date | null
  startDate: Date | null
  department: string
  street: string
  city: string
  states: Array<any>
  zipCode: string
}

export const initialState: FormState = {
  success: false,
  error: null,
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

const formReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SAVE_EMPLOYEE":
      return {
        ...state,
        success: true,
        error: null,
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
        success: false,
        error: action.payload.error,
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
