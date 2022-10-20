import React, { useState, useEffect, useCallback } from "react";
import { BackLink } from "govuk-react";
import { useNavigate } from "react-router-dom";

export const BackButton = ({ link, state }) => {
  const navigate = useNavigate();

  function handleBack() {
    console.log("going back to " + link);
    console.log(state);
    navigate(link, {
      state: { ...state },
    });
  }
  return (
    <BackLink href="#" onClick={handleBack}>
      Back
    </BackLink>
  );
};
