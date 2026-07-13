import "./DeleteSensor.css";

export default function DeleteSensorModal({
  open,
  sensor,
  onClose,
  onDelete,
}) {

  if (!open) return null;

  return (
    <div className="delete-overlay">

      <div className="delete-modal">

        <h2>Delete Sensor</h2>

        <p>
          Are you sure you want to delete
          <strong> {sensor?.name}</strong> ?
        </p>

        <p className="warning">
          This action cannot be undone.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={() => onDelete(sensor.id)}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}