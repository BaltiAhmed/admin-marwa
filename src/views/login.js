import React, { useState, useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
} from "mdbreact";
import { Container, Row, Col } from "react-bootstrap";
import ErrorModel from "../models/error-model";
import SuccessModel from "../models/success-model";
import { Authcontext } from "../context/auth-context";

const Login = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const auth = useContext(Authcontext);

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        seterror(responsedata.message);
        throw new Error(responsedata.message);
      }

      auth.login(responsedata.admin,responsedata.admin._id, responsedata.token);
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          
          <form style={{ marginTop: "30%" }} onSubmit={submit}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <p className="h5 text-center mb-4">Authentification</p>
            <div className="grey-text">
              <MDBInput
                label="Entrer votre email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
                name="email"
                onChange={onchange}
                required
              />
              <MDBInput
                label="Entrer votre mot de passe"
                icon="lock"
                group
                type="password"
                validate
                name="password"
                onChange={onchange}
                required
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit">Valider</MDBBtn>
            </div>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default Login;
