import { RootState } from "../../app/store"
import { Employee } from "./reducer"

// Sélecteur pour récupérer le tableau des employés
export const selectEmployees = (state: RootState): Employee[] =>
  state.employees.employees
