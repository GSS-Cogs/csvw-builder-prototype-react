import React, { useState, useEffect } from "react";
import {
  BackLink,
  Button,
  Fieldset,
  FileUpload,
  GridCol,
  GridRow,
  H1,
  H2,
  H3,
  InputField,
  Select,
  SectionBreak,
  Table,
} from "govuk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import { BackButton } from "../../components/BackButton";

export const DownloadFilesView = ({}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const [title] = useState(state?.title);
  const [fileNames] = useState(state?.fileNames);
  // const [csvFileTitle] = useState(state?.csvFileTitle);
  // const [csvFile] = useState(state?.csvFile);
  // const [csvFileRaw] = useState(state?.csvFileRaw);
  // const [description] = useState(state?.description);

  useEffect(() => {
    console.log("state on download is");
    console.log(state);
  }, []);
  console.log(state);
  function nameCheck(name) {
    var lowerName = name.toLowerCase();
    var obs = ["observations", "obs", "values", "value", "val", "vals"];
    var units = [
      "unit",
      "units",
      "units column",
      "unit column",
      "unit type",
      "unit types",
    ];
    var meas = [
      "measure",
      "measures",
      "measures column",
      "measure column",
      "measure type",
      "measure types",
    ];
    if (obs.includes(lowerName)) {
      return "observation";
    }
    if (units.includes(lowerName)) {
      return "unit";
    }
    if (meas.includes(lowerName)) {
      return "measure";
    }
    return "dimension"; //name;
  }

  const downloadFile = (filename) => {
    console.log(filename);
    fetch(`/download/${filename}/${title}`)
      .then((res) => res.blob())
      .then((data) => {
        console.log("success");
        console.log(typeof data);
        saveAs(data, filename);
      });
  };

  const DownloadableFilesList = () => {
    let columns = [];
    if (fileNames.length > 0) {
      fileNames.forEach((title, index) => {
        const newTitle = nameCheck(title);
        const columnFields = (
          <Table.Row key={index}>
            <Table.Cell>
              <H3 style={{ marginBottom: 0 }}>{title}</H3>
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() => downloadFile(title)}
                disabled={isSubmitting}
                style={{ marginBottom: 0 }}
              >
                Download
              </Button>
            </Table.Cell>
          </Table.Row>
          //           <>
          //   <GridRow>
          //     <GridCol setWidth="two-thirds">
          //       <H3 style={{ marginBottom: 0 }}>{title}</H3>
          //     </GridCol>
          //     <GridCol setWidth="one-quarter">
          //       <Button
          //         onClick={() => {}}
          //         disabled={isSubmitting}
          //         style={{ marginBottom: 0 }}
          //       >
          //         Download
          //       </Button>
          //     </GridCol>
          //   </GridRow>
          //   <SectionBreak
          //     //level="SMALL"
          //     visible
          //   />
          // </>
        );
        // InputField({ label: { text: "Label (Optional)" }, id: "event-name", name: "event-name", value: name } )
        // govukInput({ label: { text: "Description (Optional)" }, id: "event-name", name: data['Description']})
        // govukInput({ label: { text: "From Existing (Optional)" }, id:
        // "event-name", name: data['Description'] })
        // govukInput({ label: { text: "Definition uri (Optional)" }, id: "event-name", name: "event-name" })
        columns.push(columnFields);
      });
    }

    //return columns;
    return <Table>{columns}</Table>;
  };

  return (
    <>
      <BackButton state={state} link="/describedata" />
      <H1>Download Files</H1>
      <H2 className="govuk-heading-m">Files</H2>
      <DownloadableFilesList />
    </>
  );
};
