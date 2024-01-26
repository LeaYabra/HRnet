// actions.ts
import { Employee } from "./reducer"

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
