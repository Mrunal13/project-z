import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import s from "./multiplestep.module.css";

import MultiStepFormContext from "@/provider/MultiStepForm";

// export interface IndustryCategory {
//   name: string;
//   label: string;
// }

// export const categoryOptions: IndustryCategory[] = [
//   { name: "Commerce", label: "Commerce" },
//   { name: "Construction", label: "Construction" },
//   { name: "Chemical industries", label: "Chemical industries" },
//   { name: "Basic Metal Production", label: "Basic Metal Production" },
// ];

const validationSchema = Yup.object().shape({
  industryCategory: Yup.string().required("Industry Category is required"),
  industryDescription: Yup.string()
    .required("Industry Description is required")
    .max(500, "Must be 500 characters or less"),
  businessDescription: Yup.string()
    .required("Business Description is required")
    .max(500, "Must be 500 characters or less"),
  includeBrandName: Yup.string().required(
    "Please select whether to include Brand Name"
  ),
  brandName: Yup.string().when("includeBrandName", {
    is: (value: any) => value === "yes",
    then: (schema) =>
      schema.required("Brand Name is required when including it"),
    otherwise: (schema) => schema,
  }),
});
const Industry = () => {
  const {
    Industrydetails,
    setIndustryDetails,
    next,
    prev,
    SetCategory,
    category,
  }: any = useContext(MultiStepFormContext);

  const [showBrandNameInput, setShowBrandNameInput] = useState(false);

  const handleCreate = async (inputValue: string, formikProps: any) => {
    console.log("inputValue", inputValue);
    SetCategory((prev: any) => [
      ...prev,
      { name: inputValue, label: inputValue },
    ]);
    formikProps.setFieldValue("industryCategory", inputValue);
    console.log(category, "category");
  };

  return (
    <div className={`${s.stepswrapper} `}>
      <div className={s.maincard}>
        <h6 className={s.heading}>Industry Details</h6>
        <Formik
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // You can handle form submission here
            setIndustryDetails(values);
            next();
            console.log("values", values);
            // Call next() to proceed to the next step
            next();
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <div className={s.formwrapper}>
                <label htmlFor="industryCategory">
                  Select OR Create Industry Category
                </label>
                <CreatableSelect
                  id="industryCategory"
                  name="industryCategory"
                  isClearable
                  options={category}
                  value={category.find(
                    (option: any) =>
                      option.name === formikProps.values.industryCategory
                  )}
                  onCreateOption={(inputValue) =>
                    handleCreate(inputValue, formikProps)
                  }
                  onChange={(newValue) => {
                    console.log("newValue", newValue);

                    formikProps.setFieldValue(
                      "industryCategory",
                      newValue?.name
                    );
                  }}
                />
                <ErrorMessage
                  name="industryCategory"
                  component="div"
                  className={s.error}
                />

                <div className={`${s.Description} form-group`}>
                  <label htmlFor="industryDescription">
                    Industry Description
                  </label>
                  <br />
                  <textarea
                    className="form-control"
                    id="industryDescription"
                    name="industryDescription"
                    onChange={formikProps.handleChange}
                    value={formikProps.values.industryDescription}
                  ></textarea>
                  <ErrorMessage
                    name="industryDescription"
                    component="div"
                    className={s.error}
                  />
                </div>
                <div className={`${s.Description} form-group`}>
                  <label htmlFor="businessDescription">
                    Business Description
                  </label>
                  <textarea
                    className="form-control"
                    id="businessDescription"
                    name="businessDescription"
                    onChange={formikProps.handleChange}
                    value={formikProps.values.businessDescription}
                  ></textarea>
                  <ErrorMessage
                    name="businessDescription"
                    component="div"
                    className={s.error}
                  />
                </div>
                <div>
                  <label>Include Brand Name?</label>
                  <div>
                    <label>
                      Yes
                      <Field
                        type="radio"
                        name="includeBrandName"
                        value="yes"
                        onClick={() => setShowBrandNameInput(true)}
                      />
                    </label>
                    <label>
                      No
                      <Field
                        type="radio"
                        name="includeBrandName"
                        value="no"
                        onClick={() => {
                          setShowBrandNameInput(false);
                          formikProps.setFieldValue("brandName", ""); // Reset brandName when 'No' is selected
                        }}
                      />
                    </label>
                  </div>
                  {formikProps.values.includeBrandName === "yes" && (
                    <div>
                      <label htmlFor="brandName">Brand Name</label>
                      <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        onChange={formikProps.handleChange}
                        value={formikProps.values.brandName}
                      />
                      <ErrorMessage
                        name="brandName"
                        component="div"
                        className={s.error}
                      />
                    </div>
                  )}
                  <ErrorMessage
                    name="includeBrandName"
                    component="div"
                    className={s.error}
                  />
                </div>
                <button className={`${s.btnnext} mt-2`} type="submit">
                  Next
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Industry;
