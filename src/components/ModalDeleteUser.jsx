import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { postCreateUser, deleteUser } from "../services/userService";

const ModalDeleteUser = ({
  show,
  handleClose,
  dataUserDelete,
  handleDeleteUser,
  handleDeleteUserFromModal,
}) => {
  const handleSaveUser = async () => {
    await deleteUser(dataUserDelete.id);
    handleClose();
    handleDeleteUserFromModal(dataUserDelete);
    toast.success("User is delete success");
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>
          Are you sure to delete user with name: {dataUserDelete.first_name}
        </h2>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveUser}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteUser;
