import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { ModalBody } from "react-bootstrap";

export default function ClubTable({ search, update }) {
  //////////////////// SEARCH//////////////////////
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  function getDataIsSearch() {
    if (search) {
      return handleSearch();
    } else return fetchData();
  }

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/club/find?name=${search}`
      );
      const data = await response.json();
      setSearchData(data);
      if (response.ok) {
        setData([...data]);
      } else {
        const errorData = await response.json();
        alert(`${errorData?.message}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
    }
  };
  /////////////////////////////////////////////////////////////

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [refetch, setReFetch] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  //   GET DATA //////////////////////////

  React.useEffect(() => {
    getDataIsSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, refetch, search]);
  // if (search) {
  //   console.log('succsses');
  // }else console.log('error');

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/club/findAll");

      if (response.ok) {
        const data = await response.json();
        setData(data || []);
      } else console.error("Error fetching data");
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  ///// GET SEARCH DATA

  //////   DELETE   //////////////////////////
  const [deleted, setDeleted] = useState();
  const HandleShow = (id) => {
    setShow(true);
    setDeleted(id);
  };
  const handleDelete = async () => {
    setShow(false);
    try {
      const response = await fetch(
        `http://localhost:8080/club?clubId=${deleted}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during delete request:", error.message);
    }
    setReFetch(!refetch);
  };

  //// EDIT DATA  ////////
  const [editData, setEditData] = useState();
  const [oldName, setOldName] = useState("");

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowEdit = (data) => {
    setShowEdit(true);
    setOldName(data?.name);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setShowEdit(false);

    try {
      const response = await fetch(
        `http://localhost:8080/club?name=${oldName}`,
        {
          method: "PUT", // or 'PATCH' depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        console.log("Data updated successfully");
        // Optionally, you can fetch updated data after a successful edit
        fetchData();
      } else {
        console.error("Error updating data:", response.status);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }

    // setIsLoading(false);
  };
  // setData(searchData)
  console.log('data ', [searchData]);
  return (
    <TableContainer style={{ background: "none" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>
              <h5> Name</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Club id</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Intro</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              {" "}
              <h5>Date</h5>{" "}
            </TableCell>
            <TableCell
              style={{ color: "white", paddingRight: "30px" }}
              align="right"
            >
              <h5>Action</h5>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(search ? [searchData] : data).map((row) => (
            <TableRow
              key={row.usid}
              style={{ color: "white" }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row?.usid}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row?.intro}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row?.foundationDay}
              </TableCell>
              <TableCell
                style={{ color: "white", display: "flex", gap: "25px" }}
                align="right"
              >
                <DeleteIcon
                  onClick={() => HandleShow(row?.usid)}
                  style={{ cursor: "pointer" }}
                />
                <EditIcon
                  onClick={() => handleShowEdit(row)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
          {/* {[...searchData].map((row) => (
            <TableRow
              key={row.usid}
              style={{ color: "white" }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row?.name}
              </TableCell>
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row?.usid}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row?.intro}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row?.foundationDay}
              </TableCell>
              <TableCell
                style={{ color: "white", display: "flex", gap: "25px" }}
                align="right"
              >
                <DeleteIcon
                  onClick={() => HandleShow(row?.usid)}
                  style={{ cursor: "pointer" }}
                />
                <EditIcon
                  onClick={() => handleShowEdit(row)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>

      {/* MODAL DELETE */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modal-css">
          <Modal.Title>Haqiqatdan o'shirmoqchimisz</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="modal-css">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT MODAL */}
      <Modal show={showEdit} onHide={handleClose}>
        <Modal.Header className="modal-css">
          <Modal.Title>EDIT</Modal.Title>
        </Modal.Header>
        <ModalBody className="modal-css">
          <form className=" modal-body " onSubmit={handleEdit}>
            <input
              onChange={handleInputChange}
              //   defaultValue={editData?.name}
              name="name"
              className="form_input"
              type="text"
              placeholder="name"
            />
            <input
              onChange={handleInputChange}
              //   defaultValue={editData?.intro}
              name="intro"
              className="form_input"
              type="text"
              placeholder="intro"
            />
            <button className="button" variant="primary">
              Edit
            </button>
          </form>
        </ModalBody>
        <Modal.Footer className="modal-css">
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </TableContainer>
  );
}
