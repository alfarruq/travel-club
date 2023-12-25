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


export default function BasicTable({ update }) {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };


  //////   DELETE   //////////////////////////
  const [deleted, setDeleted] = useState();
  const [refetch, setReFetch] = useState(false);
  const HandleShow = (id) => {
    setShow(true);
    setDeleted(id);
  };
  const handleDelete = async () => {
    setShow(false);
    try {
      const response = await fetch(
        `http://localhost:8080/member?memberId=${deleted}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // You might need to include additional headers, such as authorization headers.
          },
        }
      );

      if (response.ok) {
        // setDeleted(true);
      } else {
        console.error("Failed to delete data:", response.statusText);
      }
    } catch (error) {
      console.error("Error during delete request:", error.message);
    }
    setReFetch(!refetch);
  };

  //   GET DATA //////////////////////////
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
  }, [update, refetch]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/member/all");

      if (response.ok) {
        const data = await response.json();
        setData(data || []);
      } else console.error("Error fetching data");
    } catch (error) {
      console.error("Network error:", error);
    }
  };
   //// EDIT DATA  ////////
   const [editData, setEditData] = useState({});
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
     setEditData(data)
   };
 
 const handleEdit = async (e) => {
     e.preventDefault();
     setShowEdit(false);
 
     try {
       const response = await fetch(
         `http://localhost:8080/member?email=${editData?.email}`,
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

  return (
    <TableContainer style={{ background: "none" }} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "white" }}>
              <h5>Name</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Date</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Email</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Number</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>Nickname</h5>
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
          {data.map((row) => (
            <TableRow
              key={row.email}
              style={{ color: "white" }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.birthDay}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.email}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.phoneNumber}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.nickName}
              </TableCell>
              <TableCell
                style={{ color: "white", display: "flex", gap: "25px" }}
                align="right"
              >
                <DeleteIcon
                  onClick={() => HandleShow(row?.email)}
                  style={{ cursor: "pointer" }}
                />
                <EditIcon
                  onClick={()=>handleShowEdit(row)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL DELETE */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Haqiqatdan o'shirmoqchimisz</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
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
          <form onSubmit={handleEdit} className=" modal-body ">
            <input
              onChange={handleInputChange}
              defaultValue={editData?.name}
              name="name"
              className="form_input"
              type="text"
              placeholder="name"
            />
            <input
              onChange={handleInputChange}
              defaultValue={editData?.phoneNumber}
              name="phoneNumber"
              className="form_input"
              type="text"
              placeholder="number"
            />
            <input
              onChange={handleInputChange}
              defaultValue={editData?.nickName}
              name="nickName"
              className="form_input"
              type="text"
              placeholder="nickname"
            />
            <input
              onChange={handleInputChange}
              defaultValue={editData?.birthDay}
              name="birthDay"
              type="date"
              className="form_input"
              placeholder="birthfay(dd.mm.yyyy)"
            />
            <button className="button" variant="primary">
              Edit
            </button>
          </form>
        </ModalBody>
        <Modal.Footer className="modal-css">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </TableContainer>
  );
}
