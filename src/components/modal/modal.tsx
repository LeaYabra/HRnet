import React from "react"
import "./modal.css"

type MyModalProps = {
  visible: boolean
  onClose: () => void // Définir explicitement le type de onClose
}

const MyModal: React.FC<MyModalProps> = ({ visible, onClose }) => {
  return (
    <div className={visible ? "modal show" : "modal hide"}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p> Employé créer avec succès !</p>
        <button className="close-bottom-right" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default MyModal
