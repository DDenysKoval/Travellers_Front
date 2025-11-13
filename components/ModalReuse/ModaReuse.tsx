import React from "react";
import css from '../ModalReuse/ModalReuse.module.css'

type Action = {
  label: string;
  onClick: () => void;
  primary?: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  actions: Action[];
};

const ModalReuse: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  message,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={action.primary ? "primary" : ""}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModalReuse;
