import React from "react";

export default function Success({ success }) {
  if (!success) return null;
  return (
    <div className="success">
      <p>Saved successfully</p>
    </div>
  );
}
