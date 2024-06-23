import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
`;

const AddCategoryModal = ({ isOpen, onRequestClose, onAddCategory }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    onAddCategory({ name, image });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalContainer>
        <h2>Add Category</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button onClick={handleSubmit}>Add</Button>
      </ModalContainer>
    </Modal>
  );
};

export default AddCategoryModal;
