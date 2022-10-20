import React, { useState, useEffect } from "react";
import {
  BackLink,
  Button,
  GridCol,
  GridRow,
  H1,
  H2,
  Paragraph,
} from "govuk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BackButton } from "../../components/BackButton";

export const ReviewDetailsView = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const [title] = useState(state?.title);
  const [csvFileTitle] = useState(state?.csvFileTitle);
  const [csvFile] = useState(state?.csvFile);
  const [description] = useState(state?.description);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("3 review details");
  }, []);

  const handleSubmit = () => {
    console.log("submitting data");
    navigate("/describedata", {
      state: { ...state, csvFile: csvFile, csvFileTitle: csvFileTitle },
    });
  };

  const handleOnClickChange = (link) => {
    console.log("clicked change data");
    navigate(link, {
      state: { ...state, csvFile: csvFile, csvFileTitle: csvFileTitle },
    });
  };

  const DescriptionListItem = ({ label, value, link }) => (
    <div className="govuk-summary-list__row">
      <dt className="govuk-summary-list__key">{label}</dt>
      <dd className="govuk-summary-list__value">{value}</dd>
      <dd className="govuk-summary-list__actions">
        <a href={"#"} onClick={() => handleOnClickChange(link)}>
          Change
        </a>
      </dd>
    </div>
  );

  return (
    <>
      <BackButton state={state} link="/datasetdetails" />
      <H1>Review configuration</H1>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H2>Dataset details</H2>

          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <DescriptionListItem
              label="Title"
              value={title}
              link="/datasetdetails"
            />
            <DescriptionListItem
              label="Description"
              value={description}
              link="/datasetdetails"
            />
          </dl>

          <H2>File details</H2>

          <dl className="govuk-summary-list govuk-!-margin-bottom-9">
            <DescriptionListItem
              label="CSV"
              value={csvFileTitle}
              link="/fileupload"
            />
            <DescriptionListItem
              label="Configuration (optional)"
              value="Set of eurovision data"
              link="/fileupload"
            />
            <DescriptionListItem
              label="CSVW metadata (optional)"
              value="Set of eurovision data"
              link="/fileupload"
            />
          </dl>
        </GridCol>
      </GridRow>
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H2>Next, describe your data</H2>
          <Paragraph>
            Submitting this configuration will cause your file to be processed
            and give you the ability to provide further description of each
            column in your data.
          </Paragraph>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            Submit and continue
          </Button>
        </GridCol>
      </GridRow>
    </>
  );
};
