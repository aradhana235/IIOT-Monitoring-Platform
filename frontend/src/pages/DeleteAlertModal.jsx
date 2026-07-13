import { TriangleAlert } from "lucide-react";

export default function DeleteAlertModal({

    open,
    onClose,
    onDelete

}) {

    if (!open) return null;

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <div className="delete-icon">

                    <TriangleAlert size={55} />

                </div>

                <h2>

                    Delete Alert

                </h2>

                <p>

                    Are you sure you want to delete this alert?

                </p>

                <span>

                    This action cannot be undone.

                </span>

                <div className="modal-actions">

                    <button
                        className="cancel-btn"
                        onClick={onClose}
                    >

                        Cancel

                    </button>

                    <button
                        className="delete-btn"
                        onClick={onDelete}
                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}