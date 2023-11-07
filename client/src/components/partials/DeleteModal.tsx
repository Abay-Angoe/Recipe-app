import React from 'react';
import './partials.css'

interface DeleteModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onCancel, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to delete this recipe?</p>
        <div className="modal-btn-group">
          <button className="modal-btn cancel" onClick={onCancel}>
            No
          </button>
          <button className="modal-btn delete" onClick={onDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
