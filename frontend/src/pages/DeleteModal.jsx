import "../styles/DeleteModal.css";
import { Trash2, X } from "lucide-react";

export default function DeleteModal({
    open,
    title,
    message,
    onCancel,
    onConfirm
}) {

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <div className="modal-icon">

                    <Trash2 size={45} />

                </div>

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-buttons">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        <X size={18}/>
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        <Trash2 size={18}/>
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}