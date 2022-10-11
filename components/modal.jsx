import React from "react";

function Modal({ children, show = false, onClose }) {
  if (!show) return null;
  return (
    <div
      className="fixed h-screen w-100 z-20 top-0 right-0 left-0"
      style={{ overflowY: "hidden", backgroundColor: "rgba(0, 0, 0, 0.35)" }}
    >
      {children}
    </div>
  );
}

export default Modal;
