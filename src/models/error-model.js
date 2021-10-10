import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {Alert} from "react-bootstrap";

export default function ErrorModel(props) {
  return <>{props.error && <Alert variant="danger">{props.error}</Alert>}</>;
}
