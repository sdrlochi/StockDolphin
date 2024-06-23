import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSuppliers,
  addSupplier,
  deleteSupplier,
  updateSupplier,
} from "../slices/suppliersSlice";
import styled from "styled-components";
import AddSupplierModal from "../components/AddSupplierModal";
import EditSupplierModal from "../components/EditSupplierModal";

const Container = styled.div`
  margin-left: 10px;
`;

const Title = styled.h3`
  margin-left: 10px;
`;

const Line = styled.div`
  margin: 5px 10px 0 10px;
  border-bottom: 1px solid black;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 10px 0 10px;
`;

const SearchBar = styled.input`
  padding: 5px;
  width: 200px;
`;

const AddButton = styled.button`
  padding: 5px 10px;
`;

const SuppliersContainer = styled.div`
  background-color: grey;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SupplierCard = styled.div`
  background-color: white;
  padding: 10px;
  width: 288px;
  height: 315px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SupplierDetails = styled.div`
  flex-grow: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Suppliers = () => {
  const dispatch = useDispatch();
  const { suppliers, loading, error } = useSelector((state) => state.suppliers);
  const [search, setSearch] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  const handleAddSupplier = (supplier) => {
    dispatch(addSupplier(supplier));
  };

  const handleEditSupplier = (supplier) => {
    dispatch(updateSupplier(supplier)).then(() => {
      setEditModalOpen(false);
      setSelectedSupplier(null);
    });
  };

  const handleDeleteSupplier = (supplierId) => {
    dispatch(deleteSupplier(supplierId)).then(() => {
      setSelectedSupplier(null);
    });
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Title>Suppliers</Title>
      <Line />
      <SearchBarContainer>
        <SearchBar
          type="text"
          placeholder="Search suppliers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddButton onClick={() => setAddModalOpen(true)}>
          Add Supplier
        </AddButton>
      </SearchBarContainer>
      <SuppliersContainer>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {filteredSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id}>
            <SupplierDetails>
              <h4>{supplier.name}</h4>
              <p>{supplier.address}</p>
              <p>{supplier.phoneNumber}</p>
              <p>{supplier.email}</p>
            </SupplierDetails>
            <Actions>
              <button
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setEditModalOpen(true);
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDeleteSupplier(supplier.id)}>
                Delete
              </button>
            </Actions>
          </SupplierCard>
        ))}
      </SuppliersContainer>
      <AddSupplierModal
        isOpen={isAddModalOpen}
        onRequestClose={() => setAddModalOpen(false)}
        onAddSupplier={handleAddSupplier}
      />
      <EditSupplierModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        onEditSupplier={handleEditSupplier}
        supplier={selectedSupplier}
      />
    </Container>
  );
};

export default Suppliers;
