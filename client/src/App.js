import React, { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, createMuiTheme, ThemeProvider } from "@material-ui/core";

import Chart from "react-apexcharts";
import Loader from "react-loader-spinner";
import axios from "axios";

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        fontFamily: "Poppins",
        "&$focused": {
          // increase the specificity for the pseudo class
          fontFamily: "Poppins",
          color: "#3949AB",
        },
      },
    },
    MuiInputBase: {
      input: {
        background: "#fbfbfb",
      },
    },
  },
});

const useStyles = makeStyles(() => ({
  textField: {
    margin: 0,
    flex: 1,
    backgroundColor: "transparent",
  },
  input: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
  },
}));
const plotOptions = {
  colors: ["#F7464A", "#46BFBD", "#FDB45C"],
  labels: ["Negative", "Positive", "Neutral"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
        },
      },
    },
  },
};

function App() {
  const classes = useStyles();

  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([44, 55, 41]);
  const [tweets, setTweets] = useState([]);
  const [termDesc, setTermDesc] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");

  const submitHandler = () => {
    setLoading(true);
    setSubmitted(false);

    try {
      axios
        .get("http://localhost:8000/analyzehashtag", {
          params: {
            text: term,
          },
        })
        .then(function (response) {
          const negative = response.data.negative;
          const positive = response.data.positive;
          const neutral = response.data.neutral;

          setSubmitted(true);
          setLoading(false);
          setSeries([negative, positive, neutral]);
        });
    } catch (e) {
      console.log(e);
    }

    try {
      var url =
        "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&origin=*&redirects=1&titles=" +
        term;
      axios.get(url).then(function (response) {
        const keys = Object.keys(response.data["query"]["pages"]);
        console.log(response.data["query"]["pages"]);
        setTermDesc(response.data["query"]["pages"][keys[0]]["extract"]);
        setCurrentTerm(term);
      });
    } catch (e) {
      console.log(e);
    }

    try {
      axios
        .get("http://localhost:8000/gettweets", {
          params: {
            text: term,
          },
        })
        .then(function (response) {
          setTweets(response.data.results);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const showAnalysis = () => {
    if (submitted) {
      return (
        <div class="row">
          <div class="col-sm-4">
            <Chart
              options={plotOptions}
              series={series}
              type="donut"
              width="420"
            />
          </div>
          <div class="offset-sm-1 col-sm-7">
            <h1 class="desc_heading">What is {currentTerm}?</h1>
            <h1 class="desc_content">{termDesc}</h1>
            <br />
            <br />
          </div>
        </div>
      );
    }
  };

  const showMainContent = () => {
    if (loading) {
      return (
        <div class="loader">
          <Loader
            type="Grid"
            color="#3949AB"
            visible={loading}
            height={50}
            width={50}
          />
        </div>
      );
    } else {
      return (
        <div class="container">
          <h1
            class="text-center app-title"
            style={{ "margin-top": submitted ? "5%" : "30%" }}
          >
            Twitter Sentiment Analyzer
          </h1>
          <br />
          <br />
          <ThemeProvider theme={theme}>
            <TextField
              variant="outlined"
              className={classes.textField}
              value={term}
              label="Enter hashtag/term"
              onChange={(e) => setTerm(e.target.value)}
              style={{ width: "100%" }}
            />
          </ThemeProvider>
          <br /> <br />
          <div class="row">
            <div class="col-sm-12">
              <div class="text-center">
                <button
                  class="btn text-center btn-outline-secondary submit"
                  type="button"
                  onClick={submitHandler}
                >
                  Analyze
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          {showAnalysis()}
          <br />
          {submitted ? renderTweets() : <br />}
        </div>
      );
    }
  };

  const renderTweets = () =>
    tweets.map(function (item, i) {
      var color = "#46BFBD";

      if (item.label == "Neutral") {
        color = "#FDB45C";
      }
      if (item.label == "Negative") {
        color = "#F7464A";
      }
      return (
        <div key={i} class="tweets">
          <h2>@{item.username}</h2>
          <p>{item.text}</p>
          <h3 style={{ color: color }}>Predicted Sentiment - {item.label}</h3>
        </div>
      );
    });

  return (
    <div>
      {showMainContent()}
      <div class="footer my-auto">
        <p>
          Made with <h1 class="fa fa-heart" style={{ color: "#3949AB" }}></h1>{" "}
          by Rohit Agrawal (
          <a href="https://github.com/agrawal-rohit">Github</a>)
        </p>
      </div>
    </div>
  );
}

export default App;
