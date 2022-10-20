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
  Label,
  LabelText,
  Input,
  HintText,
  ErrorText,
  FormGroup,
} from "govuk-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { BackButton } from "../../components/BackButton";

export const DatasetDetailsView = ({ details, files }) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [title, setTitle] = useState(state?.title || "");
  const [description, setDescription] = useState(state?.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
  });

  useEffect(() => {
    console.log(state);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log("dsjhflksahdkljfhklashflsakj");
    const newErrors = {
      title: validateTitle(title),
    };
    if (isNotEmpty(newErrors)) {
      console.log(newErrors);
      setErrors(newErrors);
    } else {
      navigate("/reviewdetails", {
        state: { ...state, title: title, description: description },
      });
    }
  }, [title, description]);

  const validateTitle = (file) => (file ? undefined : "Please enter a title");

  function isNotEmpty(obj) {
    return Object.keys(obj).some((key) => obj[key]?.length > 0);
  }

  return (
    <>
      <BackButton state={state} link="/fileupload" />
      <GridRow>
        <GridCol setWidth="two-thirds">
          <H1>Dataset Details</H1>
          <Fieldset>
            <Label style={{ marginBottom: 30 }}>
              <LabelText>
                <H2>Title</H2>
              </LabelText>
              <HintText>This is the title given to your dataset</HintText>
              <ErrorText>{errors?.title}</ErrorText>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                error={errors?.title}
                touched={!!errors?.title}
                defaultValue={title}
              />
            </Label>
            <Label style={{ marginBottom: 30 }}>
              <LabelText>
                <H2>Description (optional)</H2>
              </LabelText>
              <HintText>
                This describes the data included in the dataset
              </HintText>
              <Input
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={description}
              />
            </Label>
          </Fieldset>
        </GridCol>
      </GridRow>
      <Button
        //as={Link}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </>
  );
};
