import React, { useState, useEffect, useCallback } from "react";
import {
  BackLink,
  Button,
  Fieldset,
  FileUpload,
  GridCol,
  GridRow,
  H2,
  H3,
} from "govuk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Papa from "papaparse";

export const FileUploadView = ({}) => {
  const { state } = useLocation();
  const [csvFile, setCsvFile] = useState(state?.csvFile || null);
  const [csvFileRaw, setCsvFileRaw] = useState(state?.csvFileRaw || null);
  const [csvFileTitle, setCsvFileTitle] = useState(state?.csvFileTitle || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    csvUploaded: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log("i fire once");
  }, []);

  useEffect(() => {
    // fetch("/version")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCurrentVersion(data.version);
    //   });
  }, []);

  const csvUpload = (data) => {
    if (data) {
      Papa.parse(data[0], {
        complete: function (results) {
          console.log("Finished:", results.data);
          setCsvFile(results.data);
          setCsvFileTitle(data[0].name);
          setCsvFileRaw(data[0]);
        },
      });
      //setCsvUploaded(true);
    } else {
      //setCsvUploaded(false);
    }
    // const reader = new FileReader();
    // reader.addEventListener("load", () => {
    //   setCsvFile(reader.result);
    //   console.log(reader.result);
    // });
    // reader.readAsText(data[0]);
  };

  function isNotEmpty(obj) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
  }

  const handleSubmit = useCallback(() => {
    const newErrors = {
      csvUploaded: validateCsvFile(csvFile),
    };
    if (isNotEmpty(newErrors)) {
      setErrors(newErrors);
    } else {
      navigate("/datasetdetails", {
        state: {
          csvFile: csvFile,
          csvFileTitle: csvFileTitle,
          csvFileRaw: csvFileRaw,
        },
      });
    }
  }, [csvFile]);

  const validateCsvFile = (file) =>
    file ? undefined : "Please select a valid CSV";

  return (
    <>
      <BackLink as={Link} to="/">
        Back
      </BackLink>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <Fieldset>
            <Fieldset.Legend size="L">Upload data files</Fieldset.Legend>
            <FileUpload
              style={{ marginBottom: 30 }}
              acceptedFormats=".csv"
              hint="In order to create a new dataset, you must upload a CSV (comma-delimited values) file in a tidy data format."
              name="group1"
              meta={{
                error: errors?.csvUploaded,
                touched: !!errors?.csvUploaded,
              }}
              onChange={(event) => {
                csvUpload(event.target.files);
              }}
            >
              <H3>CSV data file</H3>
            </FileUpload>
            <FileUpload
              style={{ marginBottom: 30 }}
              acceptedFormats=".json"
              hint="The qube-config.json is a configuration file which describes the structure of the data in the CSV data file. If you have this related file, please upload it below."
              name="group2"
            >
              <H3>Configuration file (optional)</H3>
            </FileUpload>
            <FileUpload
              style={{ marginBottom: 30 }}
              acceptedFormats=".csv"
              hint="THIS MAY NOT BE NEEDED! A CSVW (CSV on the Web) file is a data file for publishing data on the web."
              name="group3"
            >
              <H3>CSVW data file (optional)</H3>
            </FileUpload>
          </Fieldset>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit
          </Button>
        </GridCol>
      </GridRow>
    </>
  );
};

/*
{% extends "layout.html" %}

{% block pageTitle %}
  Question page template – {{ serviceName }} – GOV.UK Prototype Kit
{% endblock %}

{% block beforeContent %}
  <a class="govuk-back-link" href="javascript:window.history.back()">Back</a>
{% endblock %}

{% block content %}

  <div class="govuk-grid-row">
    <div class="govuk-grid-column-two-thirds">

      <h1 class="govuk-heading-xl">Upload data files</h1>

      <form class="form" action="/upload" method="post" enctype="multipart/form-data">

      {% from "govuk/components/file-upload/macro.njk" import govukFileUpload %}
      {{ govukFileUpload({
        id: "csvDataFile",
        name: "csvDataFile",
        label: {
          text: "CSV data file",
          classes: "govuk-label--m"
        },
        hint: {
          text: "In order to create a new dataset, you must upload a CSV (comma-delimited values) file in a tidy data format."
        },
        attributes: {
          accept: ".csv"
        },
        value: data['csvDataFile']
      }) }}

      {{ govukFileUpload({
        id: "optConfigFile",
        name: "optConfigFile",
        label: {
          text: "Configuration file (optional)",
          classes: "govuk-label--m"
        },
        hint: {
          text: "The qube-config.json is a configuration file which describes the structure of the data in the CSV data file.
          If you have this related file, please upload it below."
        },
    
        value: data['optConfigFile']
      }) }}

      {{ govukFileUpload({
        id: "optCsvwDataFile",
        name: "optCsvwDataFile",
        label: {
          text: "CSVW data file (optional)",
          classes: "govuk-label--m"
        },
        hint: {
          text: "THIS MAY NOT BE NEEDED! A CSVW (CSV on the Web) file is a data file for publishing data on the web."
        },
        attributes: {
          accept: ".csv, .json, .zip"
        },
        value: data['optCsvwDataFile']
      }) }}
        <button class="govuk-button" data-module="govuk-button">Upload</button>

      </form>

    </div>
  </div>

{% endblock %}
*/
