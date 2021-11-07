import React, { useEffect, useState } from "react";
import { Row, Col, Container, Image, Button } from "react-bootstrap";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Link } from "react-router-dom";
import AjoutBTN from "../../components/btnAjout";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ListClient = (props) => {
  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.existingUser);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);

  return (
    <div style={{height:"100vh"}}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={12}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="right">Nom</StyledTableCell>
                    <StyledTableCell align="right">Prénom</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Tel</StyledTableCell>

                    <StyledTableCell align="right">Adresse</StyledTableCell>
                    <StyledTableCell align="right">Gouvernorat</StyledTableCell>
                    <StyledTableCell align="right">Bloquage</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {list &&
                    list.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="right">
                          {row.nom}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.prenom}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.tel}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.adresse}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.gouvernorat}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.bloquage == "false" ? (
                            <Button
                              variant="warning"
                              onClick={async (event) => {
                                try {
                                  let response = await fetch(
                                    `http://localhost:5000/api/user/bloquer/${row._id}`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                  let responsedata = await response.json();
                                  if (!response.ok) {
                                    throw new Error(responsedata.message);
                                  }
                                  setsuccess("L'utilisateur est bloquée");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            >
                              Bloquage
                            </Button>
                          ) : (
                            <Button
                              variant="success"
                              onClick={async (event) => {
                                try {
                                  let response = await fetch(
                                    `http://localhost:5000/api/user/debloquer/${row._id}`,
                                    {
                                      method: "PATCH",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                    }
                                  );
                                  let responsedata = await response.json();
                                  if (!response.ok) {
                                    throw new Error(responsedata.message);
                                  }
                                  setsuccess("L'utilisateur est débloquée");
                                } catch (err) {
                                  console.log(err);
                                  seterror(err.message || "il y a un probleme");
                                }
                              }}
                            >
                              Débloquage
                            </Button>
                          )}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListClient;
