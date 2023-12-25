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


export default function BasicTable({ boardId,update }) {
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
    setDeleted(id.usid);
    // console.log(id);
  };
  const handleDelete = async () => {
    setShow(false);
    try {
      const response = await fetch(
        `http://localhost:8080/post?postingId=${deleted}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // You might need to include additional headers, such as authorization headers.
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




  //   GET DATA //////////////////////////
  const [data, setData] = useState([]);

  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps, no-use-before-define
  }, [update, refetch,boardId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/post?boardId=${boardId||''}`);

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
   const [oldName, setOldName] = useState(true);
 
   const handleInputChange = (e) => {
     setEditData({
       ...editData,
       [e.target.name]: e.target.value,
     });
   };
 
   const handleShowEdit = (data) => {
     setShowEdit(true);
     setOldName(!oldName);
     setEditData(data)
   };
 
 const handleEdit = async (e) => {
     e.preventDefault();
     setShowEdit(false);
 
     try {
       const response = await fetch(
         `http://localhost:8080/post`,
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
              <h5>title</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>contents</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>W Email</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>writtenDate</h5>
            </TableCell>
            <TableCell style={{ color: "white" }} align="left">
              <h5>readCount</h5>
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
              key={row.title}
              style={{ color: "white" }}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell style={{ color: "white" }} component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.contents}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.writerEmail}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.writtenDate}
              </TableCell>
              <TableCell style={{ color: "white" }} align="left">
                {row.readCount}
              </TableCell>
              <TableCell
                style={{ color: "white", display: "flex", gap: "25px" }}
                align="right"
              >
                <DeleteIcon
                  onClick={() => HandleShow(row)}
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
              defaultValue={editData?.title}
              name="title"
              className="form_input"
              type="text"
              placeholder="title"
            />
            <input
              onChange={handleInputChange}
              defaultValue={editData?.contents}
              name="contents"
              className="form_input"
              type="text"
              placeholder="contents"
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
