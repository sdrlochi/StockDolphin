import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../componenets/header/Header";
import { createCategoryAction } from "../../actions/categoryAction";
import ModalComponent from "../../componenets/modal/modalComponent";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
  };

  return (
    <div style={{ display: "flex", margin: 0 }}>
      <Header />

      <div>
        <h1>Welocme</h1>

        <div>
          <h2>Create Category</h2>

          {error && <p>Error: {error}</p>}

          <form onSubmit={submitHandler}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input type="file" id="image" onChange={handleUploadImage} />
            </div>
            <button type="submit">Create</button>
          </form>
          <button onClick={handleOpenModal}>Open Modal</button>
          <ModalComponent isOpen={isModalOpen} onClose={handleCloseModal} />
          {image ? <img alt="img" src={image} /> : "no image"}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
