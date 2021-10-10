import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {Alert} from "react-bootstrap";

export default function ErrorModel(props) {
  return <>{props.success && <Alert variant="success">{props.success}</Alert>}</>;
}
