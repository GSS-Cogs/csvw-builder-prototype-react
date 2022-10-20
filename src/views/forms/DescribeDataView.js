import React, { useState, useEffect, useCallback } from "react";
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
  LoadingBox,
  Select,
  ErrorSummary,
} from "govuk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Papa from "papaparse";
import { BackButton } from "../../components/BackButton";

const inputFieldStyle = {
  height: 50,
  marginBottom: 30,
};

const TextInput = ({ column = "", index, text, field, onChange }) => {
  // return <input ref={ref} defaultValue={text} onChange={onChange} />;
  return (
    <InputField
      key={"field" + index}
      input={{
        name: "group0",
        defaultValue: column.title,
        style: inputFieldStyle,
        onChange: (element) => onChange(field, element.target.value, index),
      }}
    >
      {text}
    </InputField>
  );
};

export const DescribeDataView = ({}) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csvConfigJson, setCsvConfigJson] = useState([]);
  const [errors, setErrors] = useState([]);

  const [title] = useState(state?.title || "");
  const [csvFileTitle] = useState(state?.csvFileTitle || "");
  const [csvFile] = useState(state?.csvFile || null);
  const [csvFileRaw] = useState(state?.csvFileRaw || null);
  const [description] = useState(state?.description || "");

  useEffect(() => {
    genConfigFile();
    console.log("state is");
    console.log(state);
  }, []);

  const addError = (text, target) => {
    if (errors.filter((e) => e.text === text).length === 0) {
      let newErrors = [...errors];
      let newError = {
        targetName: target,
        text: text,
      };
      newErrors.push(newError);
      setErrors(newErrors);
    }
  };

  const genConfigFile = () => {
    if (csvFile === null || csvFile === undefined) {
      addError("CSV file missing", "csv-missing");
      return null;
    }
    let newConfig = csvFile[0].map((title, index) => {
      return { id: index, title: title, type: nameCheck(title) };
    });
    // let newConfig = {
    //   columns: csvFile[0].map((title, index) => {
    //     return {
    //       [title]: { type: nameCheck(title) },
    //     };
    //   }),
    // };
    console.log("generating new config");
    // console.log(newConfig);
    setCsvConfigJson(newConfig);
  };

  const finalGenConfigFile = () => {
    console.log("newest json config");
    console.log(csvConfigJson);
    let newConfig = {
      $schema: "https://purl.org/csv-cubed/qube-config/v1.3",
      title: title,
      description: description,
      columns: {},
    };
    csvFile[0].forEach((value, index) => {
      const { id, title, ...newObj } = csvConfigJson[index];
      newConfig.columns[value] = newObj;
    });
    console.log("new json config");
    console.log(newConfig);
    return newConfig;
  };

  const updateType = (type, index) => {
    console.log("type: " + type + " and index: " + index);
    let newConfig = [...csvConfigJson];
    console.log(newConfig);
    for (let i = 0; i < newConfig.length; i++) {
      if (newConfig[i].id === index) {
        newConfig[i].type = type;
      }
    }
    console.log(newConfig);
    setCsvConfigJson(newConfig);
  };

  const updateConfigField = (field, value, index) => {
    console.log(
      "field: " + field + " value: " + value + " and index: " + index
    );
    let newConfig = csvConfigJson;
    for (let i = 0; i < newConfig.length; i++) {
      if (newConfig[i].id === index) {
        newConfig[i][field] = value;
      }
    }
    console.log(newConfig);
    setCsvConfigJson(newConfig);
  };

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
      return "observations";
    }
    if (units.includes(lowerName)) {
      return "units";
    }
    if (meas.includes(lowerName)) {
      return "measures";
    }
    return "dimension"; //name;
  }

  const handleSubmit = () => {
    console.log(csvFileRaw);
    setIsSubmitting(true);
    let configJson = finalGenConfigFile();
    const newData = new FormData();
    newData.append("file", csvFileRaw);
    newData.append("filename", title);
    newData.append("config", JSON.stringify(configJson));

    fetch(`/build`, {
      method: "POST",
      body: newData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.build);
        setIsSubmitting(false);
        navigate("/downloadfiles", {
          state: {
            ...state,
            csvFile: csvFile,
            csvFileTitle: csvFileTitle,
            csvFileRaw: csvFileRaw,
            fileNames: data.build.sort(),
            configJson: configJson,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
      });
  };

  function getColumnFields(title, index) {
    const value = title;

    if (value == "dimension") {
      return (
        <>
          <TextInput
            text="Range uri (Optional)"
            field={"range_uri"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="uri override (Optional)"
            field={"uri_override"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Cell uri template (Optional)"
            field={"cell_uri_template"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Code list (Optional)"
            field={"code_list"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="From template (Optional)"
            field={"from_template"}
            index={index}
            onChange={updateConfigField}
          />
        </>
      );
    } else if (value == "observations") {
      return (
        <>
          <TextInput
            text="Range uri (Optional)"
            field={"range_uri"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="uri override (Optional)"
            field={"uri_override"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Cell uri template (Optional)"
            field={"cell_uri_template"}
            index={index}
            onChange={updateConfigField}
          />
        </>
      );
    } else if (value == "measures") {
      return null;
    } else if (value == "units") {
      return (
        <>
          <TextInput
            text="Scaling factor (Optional)"
            field={"scaling_factor"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Si scaling factor (Optional)"
            field={"si_scaling_factor"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Quantity kind (Optional)"
            field={"quantity_kind"}
            index={index}
            onChange={updateConfigField}
          />
        </>
      );
    } else {
      return <div>{value}</div>;
    }
  }

  //   const TextInput = useCallback(({ column, index, text, field, onChange }) => {
  //     // return <input ref={ref} defaultValue={text} onChange={onChange} />;
  //     return (
  //       <InputField
  //         key={"field" + index}
  //         input={{
  //           name: "group0",
  //           defaultValue: column.title,
  //           style: inputFieldStyle,
  //           onChange: (element) => onChange(field, element.target.value, index),
  //         }}
  //       >
  //         {text}
  //       </InputField>
  //     );
  //   }, []);

  const ColumnDetails = () => {
    let columns = [];
    csvConfigJson.forEach((column, index) => {
      const type = column.type;
      let columnFields = (
        <Fieldset key={"base" + index}>
          <Fieldset.Legend size="LARGE">Column {index + 1}</Fieldset.Legend>
          <Select
            input={{
              name: "group1",
              onChange: (element) => {
                updateType(element.target.value, index);
              },
              defaultValue: column.type,
              style: inputFieldStyle,
            }}
          >
            <option value="dimension">Dimension</option>
            <option value="measures">Measure</option>
            <option value="observations">Observation</option>
            <option value="units">Unit</option>
          </Select>
          <TextInput
            text="Label (Optional)"
            field={"label"}
            column={column}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Description (Optional)"
            field={"description"}
            index={index}
            onChange={updateConfigField}
          />

          <TextInput
            text="From Existinng (Optional)"
            field={"from_existing"}
            index={index}
            onChange={updateConfigField}
          />
          <TextInput
            text="Definition uri (Optional)"
            field={"definition_uri"}
            index={index}
            onChange={updateConfigField}
          />
          {getColumnFields(type, index)}
        </Fieldset>
      );
      // InputField({ label: { text: "Label (Optional)" }, id: "event-name", name: "event-name", value: name } )
      // govukInput({ label: { text: "Description (Optional)" }, id: "event-name", name: data['Description']})
      // govukInput({ label: { text: "From Existing (Optional)" }, id:
      // "event-name", name: data['Description'] })
      // govukInput({ label: { text: "Definition uri (Optional)" }, id: "event-name", name: "event-name" })
      columns.push(columnFields);
    });
    return columns;
  };

  return (
    <LoadingBox loading={isSubmitting}>
      <BackButton state={state} link="/reviewdetails" />
      <H1>Describe Data</H1>
      {errors.length > 0 && (
        <ErrorSummary
          description="Please address the following issues"
          errors={errors}
          heading="Error Summary"
        />
      )}
      <H2 className="govuk-heading-m">Column details</H2>
      <ColumnDetails key={"details"} />
      {errors.length === 0 && (
        <Button
          //as={Link}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      )}
    </LoadingBox>
  );
};
