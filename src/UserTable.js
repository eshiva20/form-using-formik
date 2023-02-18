import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const UserTable = ({ data }) => {
  const handleDelete = (id) => {
    console.log("handledelete clicked", id);
    axios
      .delete(`http://localhost:8080/posts/${id}`)
      .then(() => console.log("delete"))
      .catch((err) => console.log("err", err));
  };

  const handleUpdate = () => {
    console.log("handleUpdate clicked");
  };

  return (
    <div className="usertable">
      <h1 className="details-title">User Details</h1>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="centre">Email</StyledTableCell>
              <StyledTableCell align="centre">Contact</StyledTableCell>
              <StyledTableCell align="centre">GENDER</StyledTableCell>
              <StyledTableCell align="centre">STATE</StyledTableCell>
              <StyledTableCell align="centre">AGE RANGE </StyledTableCell>
              <StyledTableCell align="centre">DELETE </StyledTableCell>
              <StyledTableCell align="centre">UPDATE </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="centre">{row.email}</StyledTableCell>
                <StyledTableCell align="centre">{row.contact}</StyledTableCell>
                <StyledTableCell align="centre">{row.gender}</StyledTableCell>
                <StyledTableCell align="centre">{row.state}</StyledTableCell>
                <StyledTableCell align="centre">{row.age}</StyledTableCell>
                <StyledTableCell align="centre">
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button onClick={() => handleUpdate(row.id)}>Update</button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
