import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { putUpdateUser } from "../services/userService";

const ModalEditUser = ({
  show,
  handleClose,
  dataUserEdit,
  handleEditUserFromModal,
}) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    const res = await putUpdateUser(dataUserEdit.id, name, job);
    if (res && res.updatedAt) {
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });

      handleClose();
      toast.success("Update user success!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="body-add-new">
          <form>
            <div class="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
