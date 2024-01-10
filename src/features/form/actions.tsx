import { FormState } from "./reducer"
import { AppThunk } from "../../app/store"

// Action pour sauvegarder les données de l'employeur avec succès
export const saveEmployee = (formData: FormState) => ({
  type: "SAVE_EMPLOYEE",
  payload: formData,
})
// Action en cas d'échec de sauvegarde
export const failureSave = (error: string | unknown) => ({
  type: "FAILURE_SAVE",
  payload: { error },
})

// Action pour sauvegarder les données de l'employeur
export const saveFormEmployee = (formState: FormState): AppThunk => {
  return (dispatch) => {
    try {
      //Enregistrer les données dans le local storage
      localStorage.setItem("employeeData", JSON.stringify(formState))

      // Simuler une vérification de succès
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
