import React from "react";
import "./Add.css";
import AddIcon from "../assets/AddNew.png";

export const Add = ({ addText }) => {
  return (
    <div>
      <div className="inside-btn">
        <div className="rectangle37">
          <img className="add-new" src={AddIcon} alt="Add new" />
        </div>
        <p className="text-btn">{addText}</p>
      </div>
    </div>
  );
};
