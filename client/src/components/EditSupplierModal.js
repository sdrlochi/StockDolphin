import React, { useState, useEffect } from "react";
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

const EditSupplierModal = ({
  isOpen,
  onRequestClose,
  onEditSupplier,
  supplier,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (supplier) {
      setName(supplier.name);
      setAddress(supplier.address);
      setPhoneNumber(supplier.phoneNumber);
      setEmail(supplier.email);
    }
  }, [supplier]);

  const handleSubmit = () => {
    onEditSupplier({ id: supplier.id, name, address, phoneNumber, email });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalContainer>
        <h2>Edit Supplier</h2>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit}>Save</Button>
      </ModalContainer>
    </Modal>
  );
};

export default EditSupplierModal;
