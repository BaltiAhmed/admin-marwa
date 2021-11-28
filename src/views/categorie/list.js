import React, { useState, useEffect, useContext } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TablePagination from "@material-ui/core/TablePagination";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import { Link } from "react-router-dom";
import AjoutBTN from "../../components/btnAjout";
import { Authcontext } from "../../context/auth-context";
import { Image } from "react-bootstrap";
import AddCategorie from "../../components/AddCategorie";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ListCategorie() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/categorie/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.categorie);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const onchange = (e) => {
    if (e.target.name === "categorie") {
      setCategorie(e.target.value);
    }
  };

  const [categorie, setCategorie] = useState();

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/categorie/ajout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: categorie,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }

      list.push(responsedata.categorie)
      setsuccess("Categorie bien ajoutée");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={10}>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <Form onSubmit={submit}>
            <Form.Group controlId="formGridEmail">
              <Form.Control
                placeholder="categorie"
                name="categorie"
                type="text"
                onChange={onchange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Nom</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell align="right">
                          {row.nom}
                        </StyledTableCell>

                        <StyledTableCell align="right">
                        <AddCategorie nom={row.nom} id={row._id} />
                          <DeleteForeverIcon
                            style={{ color: "red" }}
                            onClick={async (event) => {
                              try {
                                let response = await fetch(
                                  `http://localhost:5000/api/categorie/${row._id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  throw new Error(responsedata.message);
                                }
                                setList(
                                  list.filter((el) => el._id !== row._id)
                                );
                                setsuccess("Categorie bien suprimer");
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "il y a un probleme");
                              }
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={list && list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
