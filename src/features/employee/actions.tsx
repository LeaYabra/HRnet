/*import { Employee } from "./reducer"
import { AppThunk } from "../../app/store"

export const saveEmployee = (employee: Employee) => {
  return {
    type: "ADD_EMPLOYEE",
    payload: employee,
  }
}

export const failureSave = () => {
  return {
    type: "FAILURE_SAVE",
  }
}

export const resetForm = () => {
  return {
    type: "RESET_FORM",
  }
}
*/

// actions.ts
import { Employee } from "./reducer"
import { AppThunk } from "../../app/store"

// Action pour sauvegarder les données de l'employeur avec succès
export const saveEmployee = (formData: Employee) => ({
  type: "SAVE_EMPLOYEE",
  payload: formData,
})

// Action en cas d'échec de sauvegarde
export const failureSave = (error: string | unknown) => ({
  type: "FAILURE_SAVE",
  payload: { error },
})

// Action pour sauvegarder les données de l'employeur de manière asynchrone
export const saveFormEmployee = (formState: Employee): AppThunk => {
  return (dispatch) => {
    try {
      // Enregistrer les données dans le local storage
      localStorage.setItem("employeeData", JSON.stringify(formState))

      // Simuler une vérification de succès (vous pouvez remplacer cela par une requête API ou autre)
      const success = true
      if (success) {
        dispatch(saveEmployee(formState))
        console.log("Employee data:", formState)
      } else {
        dispatch(failureSave("Save failed"))
      }
    } catch (error) {
      dispatch(failureSave(error))
      console.error("Error saving employee data", error)
    }
  }
}
