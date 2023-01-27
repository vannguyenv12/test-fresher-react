import axios from "axios";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/userService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteUser from "./ModalDeleteUser";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";

import "./TableUser.scss";
import { toast } from "react-toastify";

const TableUsers = () => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  // const [page, setPage] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);

  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [keyword, setKeyword] = useState("");
  const [dataExport, setDataExport] = useState([]);

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
    console.log(event.selected + 1);
    // setPage(+event.selected + 1);
    // console.log(page);
  };

  const getUsers = async (page) => {
    const res = await fetchAllUsers(page);
    if (res && res.data) {
      setTotalPages(res.total_pages);
      setTotalUsers(res.total);
      setListUsers(res.data);
    }
  };

  const handleUpdateTable = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUserFromModal = (user) => {
    const cloneListUsers = [...listUsers];
    const index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].first_name = user.first_name;
    setListUsers(cloneListUsers);
  };

  const handleDeleteUser = (user) => {
    setDataUserDelete(user);
    setIsShowModalDelete(true);
  };

  const handleDeleteUserFromModal = (user) => {
    const cloneListUsers = [...listUsers];
    const newListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(newListUsers);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUsers = [...listUsers];
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);

    setListUsers(cloneListUsers);
  };

  const handleSearch = debounce((e) => {
    const term = e.target.value;
    // setKeyword(term);
    if (term) {
      let cloneListUsers = [...listUsers];
      cloneListUsers = cloneListUsers.filter((user) =>
        user.email.includes(term)
      );

      setListUsers(cloneListUsers);
    } else {
      getUsers(1);
    }
  }, 300);

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsersExport = (event, done) => {
    const result = [];

    if (listUsers.length > 0) {
      result.push(["Id", "Email", "First Name", "Last Name"]);
      listUsers.forEach((user) => {
        const arr = [];
        arr[0] = user.id;
        arr[1] = user.email;
        arr[2] = user.first_name;
        arr[3] = user.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCsv = (event) => {
    const file = event.target?.files?.[0];
    if (file.type !== "text/csv") {
      toast.error("Wrong fomart! Please upload CSV");
      return;
    }
    Papa.parse(file, {
      complete: function (results) {
        console.log("Finished:", results.data);
        setListUsers(results.data);
      },
    });
  };

  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <div className="group-btns">
          <label htmlFor="upload-csv" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i> Import
          </label>

          <input
            type="file"
            id="upload-csv"
            hidden
            onChange={handleImportCsv}
          />

          <CSVLink
            data={dataExport}
            filename="user.csv"
            className="btn btn-primary"
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>

          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add new
          </button>
        </div>
      </div>

      <div className="col-4 my-3">
        <input
          // value={keyword}
          onChange={(e) => handleSearch(e)}
          className="form-control"
          placeholder="Search user by email"
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>
                <span>
                  <i
                    className="fa-solid fa-arrow-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    className="fa-solid fa-arrow-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
        handleClose={handleClose}
      />

      <ModalDeleteUser
        show={isShowModalDelete}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
        handleClose={handleClose}
        handleDeleteUser={handleDeleteUser}
      />
    </>
  );
};

export default TableUsers;
