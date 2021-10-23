import React, { useState, useEffect } from "react";
import {
  Bar,
  Bubble,
  Doughnut,
  HorizontalBar,
  Line,
  Pie,
  Polar,
  Radar,
  Scatter,
  Chart,
} from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import DocsLink from "../components/docsLink";
import SectionContainer from "../components/sectionContainer";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

// LineChart
const dataLine = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

// RadarChart

const dataRadar = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      label: "#1",
      backgroundColor: "rgba(245, 74, 85, 0.5)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "#2",
      backgroundColor: "rgba(90, 173, 246, 0.5)",
      data: [12, 42, 121, 56, 24, 12, 2],
    },
    {
      label: "#3",
      backgroundColor: "rgba(245, 192, 50, 0.5)",
      data: [2, 123, 154, 76, 54, 23, 5],
    },
  ],
};

// barChart

// Horizontal Chart
const dataHorizontal = {
  labels: ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Grey"],
  datasets: [
    {
      label: "My First Dataset",
      data: [22, 33, 55, 12, 86, 23, 14],
      fill: false,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
      ],
      borderWidth: 1,
    },
  ],
};

// Polar Chart

// Pie Chart
const dataPie = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  datasets: [
    {
      data: [300, 50, 100, 40, 120, 24, 52],
      backgroundColor: [
        "#F7464A",
        "#46BFBD",
        "#FDB45C",
        "#949FB1",
        "#4D5360",
        "#ac64ad",
      ],
      hoverBackgroundColor: [
        "#FF5A5E",
        "#5AD3D1",
        "#FFC870",
        "#A8B3C5",
        "#616774",
        "#da92db",
      ],
    },
  ],
};

// Bubble Charts
const dataBubble = {
  labels: "Bubble",
  datasets: [
    {
      label: "John",
      data: [
        {
          x: 3,
          y: 7,
          r: 10,
        },
      ],
      backgroundColor: "#ff6384",
      hoverBackgroundColor: "#ff6384",
    },
    {
      label: "Peter",
      data: [
        {
          x: 3.2,
          y: 7,
          r: 10,
        },
      ],
      backgroundColor: "#44e4ee",
      hoverBackgroundColor: "#44e4ee",
    },
    {
      label: "Donald",
      data: [
        {
          x: 3.4,
          y: 7,
          r: 10,
        },
      ],
      backgroundColor: "#62088A",
      hoverBackgroundColor: "#62088A",
    },
  ],
};

const ChartsPage = () => {
  const classes = useStyles();
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [site, setSite] = useState();
  const [evenement, setEvenement] = useState();
  const [BonPlan, setBonPlan] = useState();
  const [client, setClient] = useState();


  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setClient(responseData.existingUser);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);


  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bonplan/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setBonPlan(responseData.bonPlan);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/evenement/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setEvenement(responseData.evenement);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/site/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setSite(responseData.sites);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(site);
  const dataBar = {
    labels: ["Site tourestique", "Evenement", "Bon plan","Client"],
    datasets: [
      {
        label: "Données ",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 0,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [
          site && site.length,
          evenement && evenement.length,
          BonPlan && BonPlan.length,
          client && client.length,
        ],
      },
    ],
  };

  const [siteId, setSiteId] = useState();
  const [siteE, setsiteE] = useState();

  const onchange = (e) => {
    if (e.target.name === "sId") {
      setSiteId(e.target.value);
    }
  };

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/site/${siteId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setsiteE(responseData.site);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, [siteId]);

  console.log(siteE);

  const dataPolar = {
    datasets: [
      {
        data: [
          /* siteE && siteE.capacite, */
          siteE && siteE.evenements.length,
          siteE && siteE.bonPlans.length,
          siteE && siteE.transports.length,
          siteE && siteE.scoreT,
        ],
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
        ],
        label: "My dataset", // for legend
      },
    ],
    labels: [/* "Capacité", */ "Evenements", "BonPlan", "Transport", "Score"],
  };

  return (
    <MDBContainer>
      <SectionContainer header="Bar chart">
        <Bar data={dataBar} options={{ responsive: true }} />
      </SectionContainer>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Site tourestique</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={siteId}
          name="sId"
          onChange={onchange}
        >
          {site &&
            site.map((row) => <MenuItem value={row._id}>{row.nom}</MenuItem>)}
        </Select>
      </FormControl>

      <SectionContainer header="">
        <Polar data={dataPolar} options={{ responsive: true }} />
      </SectionContainer>

      
    </MDBContainer>
  );
};

export default ChartsPage;
