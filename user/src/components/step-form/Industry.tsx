import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";

const validationSchema = Yup.object().shape({
  industryCategory: Yup.mixed().required("Industry Category is required"),
  industryDescription: Yup.string()
    .required("Industry Description is required")
    .max(150, "Must be 150 characters or less"),
  businessDescription: Yup.string()
    .required("Business Description is required")
    .max(150, "Must be 150 characters or less"),
  includeBrandName: Yup.string().required(
    "Please select whether to include Brand Name"
  ),
  brandName: Yup.string().when("includeBrandName", {
    is: (value: any) => value === "yes",
    then: (schema) =>
      schema.required("Brand Name is required when including it"),
    otherwise: (schema) => schema,
  }),
  // numberOfServices: Yup.number()
  //   .required("Number of services is required")
  //   .min(1, "Number of services must be at least 1"),
  services: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Service Name is required"),
    })
  ),
});
const Industry = () => {
  const {
    Industrydetails,
    setIndustryDetails,
    next,
    SetCategory,
    category,
  }: any = useContext(MultiStepFormContext);

  const [showBrandNameInput, setShowBrandNameInput] = useState(false);

  const handleCreate = (inputValue: string, formikProps: any) => {
    const otherIndex = category.findIndex((cat: any) => cat.isOther);

    SetCategory((prev: any) =>
      otherIndex !== -1
        ? [
            ...prev.slice(0, otherIndex),
            {
              ...prev[otherIndex],
              options: [
                ...prev[otherIndex].options,
                { value: inputValue, label: inputValue },
              ],
            },
            ...prev.slice(otherIndex + 1),
          ]
        : [
            ...prev,
            {
              label: "Other",
              options: [{ value: inputValue, label: inputValue }],
              isOther: true,
            },
          ]
    );

    formikProps.setFieldValue("industryCategory", inputValue);
  };
  return (
    <div className={`${s.stepswrapper} `}>
      <div className={s.maincard}>
        <h6 className={s.heading}>Industry Details</h6>
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // You can handle form submission here
            setIndustryDetails(values);
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
                  value={category
                    .flatMap((category: any) => category.options)
                    .find(
                      (option: any) =>
                        option?.label === formikProps.values.industryCategory
                    )}
                  onCreateOption={(inputValue) =>
                    handleCreate(inputValue, formikProps)
                  }
                  onChange={(newValue) => {
                    formikProps.setFieldValue(
                      "industryCategory",
                      newValue?.label
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
                  <Field
                    as="textarea"
                    className="form-control"
                    id="industryDescription"
                    name="industryDescription"
                    onChange={formikProps.handleChange}
                    value={formikProps.values.industryDescription}
                  ></Field>
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
                  <Field
                    as="textarea"
                    className="form-control"
                    id="businessDescription"
                    name="businessDescription"
                    onChange={formikProps.handleChange}
                    value={formikProps.values.businessDescription}
                  ></Field>
                  <ErrorMessage
                    name="businessDescription"
                    component="div"
                    className={s.error}
                  />
                </div>
                <FieldArray name="services">
                  {(arrayHelpers) => (
                    <div>
                      {formikProps.values.services &&
                        formikProps.values.services.map((service, index) => (
                          <div key={index}>
                            <label htmlFor={`services.${index}.name`}>
                              Service Name
                            </label>
                            <Field
                              type="text"
                              id={`services.${index}.name`}
                              name={`services.${index}.name`}
                              className="form-control"
                            />
                            <ErrorMessage
                              name={`services.${index}.name`}
                              component="div"
                              className={s.error}
                            />

                            {index > 0 && (
                              <button
                                type="button"
                                className={s.removeButton}
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                  formikProps.setFieldValue(
                                    "numberOfServices",
                                    formikProps.values.numberOfServices - 1
                                  );
                                }}
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        ))}
                      <div className={s.addmorecontainer}>
                        <button
                          className={s.addmore}
                          type="button"
                          onClick={() => {
                            arrayHelpers.push({ name: "", description: "" });
                            formikProps.setFieldValue(
                              "numberOfServices",
                              formikProps.values.numberOfServices + 1
                            );
                          }}
                        >
                          Add More Services
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
                <div>
                  <label>Include Brand Name?</label>
                  <span className={s.radiogroup}>
                    <label>
                      <Field
                        type="radio"
                        name="includeBrandName"
                        value="yes"
                        onClick={() => setShowBrandNameInput(true)}
                      />
                      {/* <span className={s.customradio}></span> */}
                      Yes
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="includeBrandName"
                        value="no"
                        onClick={() => {
                          setShowBrandNameInput(false);
                          formikProps.setFieldValue("brandName", "");
                        }}
                      />
                      {/* <span className={s.customradio}></span> */}
                      No
                    </label>
                  </span>
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

                <button className={`${s.btnnext} `} type="submit">
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
