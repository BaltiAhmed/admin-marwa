import React, { useState, useEffect } from "react";
import { Modal, Button, Container, Row, Col, Form } from "react-bootstrap";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import ErrorModel from "../models/error-model";
import SuccessModel from "../models/success-model";
import UpdateIcon from "@material-ui/icons/Update";

function MyVerticallyCenteredModal(props) {
  const [nom, setNom] = useState(props.nom);
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "name") {
      setNom(e.target.value);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:5000/api/categorie/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }
      setsuccess("La catégorie est bien modifier");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Metre à jour la categorie 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ErrorModel error={error} />
        <SuccessModel success={success} />
        <Form onSubmit={submit}>
          <Form.Group controlId="formGridEmail">
            <Form.Label>nom</Form.Label>
            <Form.Control
              type="text"
              value={nom}
              placeholder="nom"
              name="name"
              onChange={onchange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Fermer</Button>
      </Modal.Footer>
    </Modal>
  );
}
const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(2),
  },
  absolute: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const AddCategorie = (props) => {
  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <UpdateIcon
        onClick={() => {
          setModalShow(true);
        }}
        style={{ color: "green" }}
        fontSize="large"
      />
      <MyVerticallyCenteredModal
        show={modalShow}
        id={props.id}
        nom={props.nom}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default AddCategorie;
