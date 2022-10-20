import React, { useEffect } from "react";
import * as GovUK from "govuk-react";
import { Link } from "react-router-dom";
import {
  Breadcrumbs,
  GridRow,
  GridCol,
  UnorderedList,
  ListItem,
  RelatedItems,
  Paragraph,
} from "govuk-react";
export const Start = () => {
  return (
    <>
      <GovUK.Breadcrumbs>
        <Breadcrumbs.Link href="/section">Home</Breadcrumbs.Link>
        <Breadcrumbs.Link href="/section/sub-section">Section</Breadcrumbs.Link>
        Current page
      </GovUK.Breadcrumbs>

      <GridRow>
        <GridCol setWidth="two-thirds">
          <GovUK.H1>Create a CSV-W</GovUK.H1>
          <Paragraph>Use this service to:</Paragraph>

          <UnorderedList className="govuk-list govuk-list--bullet">
            <ListItem>
              upload a CSV and optionally, qube-config.json or CSV-W data file
            </ListItem>
            <ListItem>
              provide metadata that describes the structure of your CSV
            </ListItem>
            <ListItem>retrieve a resultant csvcubed output</ListItem>
          </UnorderedList>

          <p>This process takes around 5 minutes.</p>
          <GovUK.Paragraph>Click Start to continue.</GovUK.Paragraph>
          <GovUK.Button start as={Link} to="/fileupload">
            Start now
            <svg
              className="govuk-button__start-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="17.5"
              height="19"
              viewBox="0 0 33 40"
              aria-hidden="true"
              focusable="false"
            >
              <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
            </svg>
          </GovUK.Button>
        </GridCol>
        <GridCol setWidth="one-third">
          <RelatedItems>
            <h2 className="govuk-heading-m" id="subsection-title">
              Subsection
            </h2>
            <UnorderedList listStyleType="none">
              <ListItem>
                <a href="/">Related link</a>
              </ListItem>
              <ListItem>
                <a href="/">Related link</a>
              </ListItem>
              <ListItem>
                <a href="/" className="govuk-!-font-weight-bold">
                  More{" "}
                  <span className="govuk-visually-hidden">in Subsection</span>
                </a>
              </ListItem>
            </UnorderedList>
          </RelatedItems>
        </GridCol>
      </GridRow>
    </>
    // <div>
    //   <div className="govuk-breadcrumbs">
    //     <ol className="govuk-breadcrumbs__list">
    //       <li className="govuk-breadcrumbs__list-item">
    //         <a className="govuk-breadcrumbs__link" href="https://www.gov.uk">
    //           Home
    //         </a>
    //       </li>
    //       <li className="govuk-breadcrumbs__list-item">
    //         <a className="govuk-breadcrumbs__link" href="#">
    //           Section
    //         </a>
    //       </li>
    //       <li className="govuk-breadcrumbs__list-item">
    //         <a className="govuk-breadcrumbs__link">Subsection</a>
    //       </li>
    //     </ol>
    //   </div>

    //   <div className="govuk-grid-row">
    //     <div className="govuk-grid-column-two-thirds">
    //       {/* <h1 className="govuk-heading-xl">
    //         {% if serviceName %} {{ serviceName }} {% endif %}
    //       </h1> */}

    //   <p>Use this service to:</p>

    //   <ul className="govuk-list govuk-list--bullet">
    //     <li>
    //       upload a CSV and optionally, qube-config.json or CSV-W data file
    //     </li>
    //     <li>provide metadata that describes the structure of your CSV</li>
    //     <li>retrieve a resultant csvcubed output</li>
    //   </ul>

    //   <p>This process takes around 5 minutes.</p>

    //       <a
    //         href="/upload-files"
    //         role="button"
    //         draggable="false"
    //         className="govuk-button govuk-button--start govuk-!-margin-top-2 govuk-!-margin-bottom-8"
    //         data-module="govuk-button"
    //       >
    //         Start now
    // <svg
    //   className="govuk-button__start-icon"
    //   xmlns="http://www.w3.org/2000/svg"
    //   width="17.5"
    //   height="19"
    //   viewBox="0 0 33 40"
    //   aria-hidden="true"
    //   focusable="false"
    // >
    //   <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z"></path>
    // </svg>
    //       </a>
    //     </div>

    //     <div className="govuk-grid-column-one-third">
    //       <aside className="app-related-items" role="complementary">
    //         <h2 className="govuk-heading-m" id="subsection-title">
    //           Subsection
    //         </h2>
    //         <nav role="navigation" aria-labelledby="subsection-title">
    //           <ul className="govuk-list govuk-!-font-size-16">
    //             <li>
    //               <a href="#">Related link</a>
    //             </li>
    //             <li>
    //               <a href="#">Related link</a>
    //             </li>
    //             <li>
    //               <a href="#" className="govuk-!-font-weight-bold">
    //                 More{" "}
    //                 <span className="govuk-visually-hidden">in Subsection</span>
    //               </a>
    //             </li>
    //           </ul>
    //         </nav>
    //       </aside>
    //     </div>
    //   </div>
    // </div>
  );
};
