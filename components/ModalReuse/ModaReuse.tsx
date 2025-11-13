"use client";

import React from "react";
import css from "./ModalReuse.module.css";

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
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={css.title}>{title}</h2>
        <p className={css.message}>{message}</p>

        <div className={css.actions}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={`${css.button} ${action.primary ? css.primary : ""}`}
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
