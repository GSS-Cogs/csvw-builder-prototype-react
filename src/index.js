import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as GovUK from "govuk-react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router";

import { FileUploadView } from "./views/forms/FileUploadView";
import { DatasetDetailsView } from "./views/forms/DatasetDetailsView";
import { ReviewDetailsView } from "./views/forms/ReviewDetailsView";
import { DescribeDataView } from "./views/forms/DescribeDataView";
import { DownloadFilesView } from "./views/forms/DownloadFilesView";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router initialEntries={undefined}>
      <GovUK.GlobalStyle />

      <GovUK.TopNav
        serviceTitle={<GovUK.TopNav.Anchor>CSV-W Builder</GovUK.TopNav.Anchor>}
      >
        Build-it
      </GovUK.TopNav>
      <GovUK.Page.WidthContainer>
        <GovUK.Page.Main>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/FileUpload" element={<FileUploadView />} />
            <Route path="/DatasetDetails" element={<DatasetDetailsView />} />
            <Route path="/ReviewDetails" element={<ReviewDetailsView />} />
            <Route path="/DescribeData" element={<DescribeDataView />} />
            <Route path="/DownloadFiles" element={<DownloadFilesView />} />
          </Routes>
        </GovUK.Page.Main>
      </GovUK.Page.WidthContainer>
      <GovUK.Footer />
    </Router>
  </React.StrictMode>
);

// export const ExampleApplicationProps= {
//   routerEntries?: string[];
// }

// ExampleApplication.defaultProps = {
//   routerEntries: undefined,
// };

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
