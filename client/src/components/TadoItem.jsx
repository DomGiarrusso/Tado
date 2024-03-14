import React, { useState } from "react";
import "./TadoItem.css";
//add api here later

function TadoItem(props) {
  const { key, value, setItems } = props;
  return (
    <div className="tado">
      <div className="checkbox"></div>
      <div className="text">{value}</div>
      <div className="edit-tado">
        <span>edit</span>
      </div>
      <div className="delete-tado">
        <span>X</span>
      </div>
    </div>
  );
}

export default TadoItem;
