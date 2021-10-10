import { useState, useRef, useEffect } from "react";
import { Form, Button, Col, Container, Row, Image } from 'react-bootstrap';
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import axios from "axios";

const Ajout = (props) => {
  const [lat, setlat] = useState();
  const [long, setLong] = useState();
  const sucessCallback = (position) => {
    console.log(position);
    setlat(position.coords.latitude);
    setLong(position.coords.longitude);
    console.log(lat);
    console.log(long);
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(sucessCallback, errorCallback);

  const [File, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!File) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };

    fileReader.readAsDataURL(File);
  }, [File]);
  console.log(previewUrl);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    /* props.onInput(props.id, pickedFile, fileIsValid); */
  };

  const pickImageHandler = (event) => {
    filePickerRef.current.click();
  };

  const [nom, setNom] = useState();
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [adresse, setadress] = useState();
  const [gouvernorat, setgouvernorat] = useState();
  const [tel, settel] = useState();
  const [capacite, setcapacite] = useState();
  const [descrption, setdescription] = useState();
  const [categorie, setcategorie] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "email") {
      setemail(e.target.value);
    } else if (e.target.name === "adresse") {
      setadress(e.target.value);
    } else if (e.target.name === "tel") {
      settel(e.target.value);
    } else if (e.target.name === "gouvernerat") {
      setgouvernorat(e.target.value);
    } else if (e.target.name === "password") {
      setpassword(e.target.value);
    } else if (e.target.name === "cap") {
      setcapacite(e.target.value);
    } else if (e.target.name === "description") {
      setdescription(e.target.value);
    } else if (e.target.name === "categorie") {
      setcategorie(e.target.value);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    console.log(
      nom,
      email,
      password,
      descrption,
      adresse,
      gouvernorat,
      long,
      lat,
      tel,
      categorie,
      capacite
    );

    try {
      const formData = new FormData();

      formData.append("image", File);
      formData.append("nom", nom);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("description", descrption);
      formData.append("adresse", adresse);
      formData.append("gouvernorat", gouvernorat);
      formData.append("long", long);
      formData.append("lat", lat);
      formData.append("tel", tel);
      formData.append("categorie", categorie);
      formData.append("capacite", capacite);

      await axios.post(`http://localhost:5000/api/site/signup`, formData);

      setsuccess("Votre compte est bien cree");
    } catch (err) {
      seterror(err.message || "il y a un probleme");
    }
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={10}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <div
                style={{
                  width: "50%",
                  marginBottom: "30px",
                  marginTop: "20px",
                }}
              >
                <input
                  ref={filePickerRef}
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg,.png,.jpeg"
                  onChange={pickedHandler}
                />
                <div>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      rounded
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}

                  <Button
                    type="button"
                    variant="primary"
                    onClick={pickImageHandler}
                    style={{ marginTop: "20px" }}
                  >
                    Choisir une image
                  </Button>
                </div>
                {!isValid && <p></p>}
              </div>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    placeholder="Entrer votre nom"
                    name="nom"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress1">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridState">
                <Form.Label>Categorie</Form.Label>
                <Form.Control
                  as="select"
                  name="categorie"
                  onChange={onchange}
                  required
                >
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Control>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control
                    placeholder="Adresse"
                    name="adresse"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gouvernorat</Form.Label>
                  <Form.Control
                    as="select"
                    name="gouvernerat"
                    onChange={onchange}
                    required
                  >
                    <option>Choose...</option>
                    <option>...</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridCity">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  placeholder="Téléphone"
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridCity">
                <Form.Label>Capacité</Form.Label>
                <Form.Control
                  placeholder="Capacité"
                  type="number"
                  name="cap"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  name="description"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ajout;
