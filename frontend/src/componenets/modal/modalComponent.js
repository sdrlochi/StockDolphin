// ModalComponent.js
import React, { useState } from "react";
import "../modal/modalComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../actions/categoryAction";
import Multiply from "../../assets/Multiply.svg";

const ModalComponent = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [image, setImg] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { error } = categoryCreate;

  const imageBase64 = async (file) => {
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    const data = new Promise((reslove, reject) => {
      reader.onload = () => reslove(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return data;
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    const image = await imageBase64(file);
    setImg(image);
    console.log(image);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (image) {
      dispatch(createCategoryAction(name, image));
    }
    onClose();
  };
  if (!isOpen) return null;
  return (
    <div className="mainContainer">
      <div className="secondContainer">
        <div className="modalHeader">
          <p className="addCategoryHeader">Add Category</p>
          <img
            onClick={onClose}
            alt="multiply"
            src={Multiply}
            style={{ marginRight: "20px", cursor: "pointer" }}
          />
        </div>

        {error && <p>Error: {error}</p>}

        <form style={{ margin: "20px" }} onSubmit={submitHandler}>
          <input
            className="nameInput"
            type="text"
            id="name"
            placeholder="Name*"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="lineModal" />
          <div>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" onChange={handleUploadImage} />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ModalComponent;
