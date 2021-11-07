import { useState, useRef, useEffect } from "react";
import { Form, Button, Col, Container, Row, Image } from "react-bootstrap";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

const UpdateSite = (props) => {
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

  const [File, setFile] = useState(null);
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
  const [password, setpassword] = useState("");
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

  const id = useParams().id;

  const submit = async (event) => {
    event.preventDefault();

    if (File !== null) {
      try {
        const formData = new FormData();

        formData.append("image", File);
        formData.append("nom", nom);
        formData.append("email", email);
        formData.append("description", descrption);
        formData.append("adresse", adresse);
        formData.append("gouvernorat", gouvernorat);
        formData.append("long", long);
        formData.append("lat", lat);
        formData.append("tel", tel);
        formData.append("categorie", categorie);
        formData.append("capacite", capacite);

        await axios.patch(`http://localhost:5000/api/site/${id}`, formData);

        setsuccess("Votre site est bien modifier");
      } catch (err) {
        seterror(err.message || "il y a un probleme");
      }
    } else {
      seterror("Choisir une nouvelle image");
    }
  };

  const [list, setList] = useState();
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

    const sendRequest1 = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/site/${id}`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setNom(responseData.site.nom);
        setemail(responseData.site.email);
        setcategorie(responseData.site.categorie);
        setgouvernorat(responseData.site.gouvernorat);
        setcapacite(responseData.site.capacite);
        setdescription(responseData.site.description);
        settel(responseData.site.tel);
        setadress(responseData.site.adresse);
        setPreviewUrl("http://localhost:5000/" + responseData.site.photo);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest1();
  }, []);

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
                    value={nom}
                    placeholder="Entrer votre nom"
                    name="nom"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={onchange}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridState">
                <Form.Label>Categorie</Form.Label>
                <Form.Control
                  value={categorie}
                  as="select"
                  name="categorie"
                  onChange={onchange}
                  required
                >
                  {list && list.map((row) => <option>{row.nom}</option>)}
                </Form.Control>
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control
                    value={adresse}
                    placeholder="Adresse"
                    name="adresse"
                    onChange={onchange}
                    required
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Gouvernorat</Form.Label>
                  <Form.Control
                    value={gouvernorat}
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
                  value={tel}
                  placeholder="Téléphone"
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formGridCity">
                <Form.Label>Capacité</Form.Label>
                <Form.Control
                  value={capacite}
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
                  value={descrption}
                  as="textarea"
                  rows={5}
                  name="description"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Modifier
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateSite;
