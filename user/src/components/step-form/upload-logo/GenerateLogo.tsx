import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  includeImage: Yup.string().required(
    "Please select whether to include an image"
  ),

  selectedImage: Yup.mixed().when("includeImage", {
    is: (value: any) => value === "yes",
    then: (schema) => schema.required("Please Upload image"),
    otherwise: (schema) => schema,
  }),
});

const GenerateLogo = () => {
  const {
    Industrydetails,
    setIndustryDetails,
    prev,
    next,
    logo,
    setLogo,
  }: any = useContext(MultiStepFormContext);
  const [selectedImage, setSelectedImage] = useState(null);

  // handle click for the upload  image
  const handleImageChange = (e: any, formikProps: any) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      formikProps.setFieldValue("selectedImage", file);
    }
  };

  // handle Submit the upload logo form
  const handleSelectLogo = (values: any) => {
    // setLogo(values);
    next(4);
  };

  return (
    <div className="container">
      <div className="popup-container other-main-wrapper">
        {/* <Title title={`Let’s Create a Unique Logo For Your Brand!`} /> */}
        <div className="title-dashboard">
          Let’s Create a Unique <span className="style-title">Logo</span> For
          Your Brand!
        </div>
        <div className="btnwrapper align-self-end ">
          <button
            className="btnprev btn"
            onClick={() => {
              if (Industrydetails.hasBrandLogo === "no") {
                prev(2);
              }
            }}
          >
            <a>Back</a>
          </button>
          <button className="btnnext btn">
            <a onClick={handleSelectLogo}>Next</a>
          </button>
        </div>
        {/* <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={handleSelectLogo}
        >
          {({ handleSubmit, handleChange, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} className="brandnameform">
              <div className="title-dashboard">
                Let’s Create a Unique <span className="style-title">Logo</span>{" "}
                For Your Brand!
              </div>

              <div className="btnwrapper align-self-end ">
                <button className="btnprev btn" onClick={prev}>
                  <a>Back</a>
                </button>
                <button className="btnnext btn" type="submit">
                  <a>Next</a>
                </button>
              </div>
            </form>
          )}
        </Formik> */}
      </div>
    </div>
  );
};
export default GenerateLogo;
