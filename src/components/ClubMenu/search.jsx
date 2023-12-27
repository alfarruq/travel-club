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


const SearcgData = ({data}) => {
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
          {data.map((row) => (
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
                //   onClick={() => HandleShow(row?.usid)}
                  style={{ cursor: "pointer" }}
                />
                <EditIcon
                //   onClick={() => handleShowEdit(row)}
                  style={{ cursor: "pointer" }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SearcgData;
