import React from "react";

export default function Success({ success, message }) {
  if (!success) return null;
  return (
    <div className="success">
      <p>{message}</p>
    </div>
  );
}
