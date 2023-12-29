import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
import { Title } from "../base/Title";
import { Label } from "../base/form/Label";
import TextArea from "../base/form/TextArea";
import TextInput from "../base/form/TextInput";
import RadioButtonGroup from "../base/form/RadioButtongroup";

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
});
const Industry = () => {
  const {
    Industrydetails,
    setIndustryDetails,
    next,
    SetCategory,
    category,
    setMutate,
  }: any = useContext(MultiStepFormContext);

  const [showBrandNameInput, setShowBrandNameInput] = useState(false);

  // handle click for the create the category.
  const handleCategoryCreate = async (
    inputValue: string,
    setFieldValue: any
  ) => {
    const otherIndex = category.findIndex((cat: any) => cat.isOther);

    try {
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subCategoryName: inputValue }),
      });
      setMutate(true);
      setFieldValue("industryCategory", inputValue);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  //Handle submit industry form
  const IndustryFormSubmit = (values: any) => {
    // You can handle form submission here
    setIndustryDetails(values);
    // Call next() to proceed to the next step
    next();
  };

  // Handle the focus event
  const handleFocus = (e: any) => {
    // console.log(`Field focused: ${e.target.name}`);
  };

  // Handle the KeyDown  event
  const handleKeyDown = () => {
    // console.log("keydown");
  };

  // Handle the KeyUp  event
  const handleKeyUp = () => {
    // console.log("keyup");
  };

  // Handle the KeyPress  event
  const handleKeyPress = () => {
    // console.log("keypress");
  };

  return (
    <div className="mainsection ">
      <div className="leftSection ">
        <Image src="/images/left-img.svg" alt="leftsideimage" width={500} height={510} />
      </div>
      <div className="rightSection ">
        <Title title="What industry? Describe industry briefly." />
        <p className="small-heading">
          Lorem ipsum dolor sit amet consectetur. Facilisi in iaculis{" "}
        </p>
        <div className="formwrapper">
          <Formik
            enableReinitialize={true}
            initialValues={Industrydetails}
            validationSchema={validationSchema}
            onSubmit={IndustryFormSubmit}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              handleReset,
              setFieldValue,
              errors,
              touched,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Label label="Industry Category" htmlFor="industryCategory" />
                  <CreatableSelect
                    id="industryCategory"
                    name="industryCategory"
                    isClearable
                    options={category}
                    onFocus={handleFocus}
                    value={category
                      .flatMap((category: any) => category.options)
                      .find(
                        (option: any) =>
                          option?.label === values.industryCategory
                      )}
                    onCreateOption={(inputValue) =>
                      handleCategoryCreate(inputValue, setFieldValue)
                    }
                    onChange={(newValue) => {
                      setFieldValue("industryCategory", newValue?.label);
                    }}
                    placeholder="Please provide a brief description of the industry"
                  />

                  {/* <ErrorMessage
                      name="industryCategory"
                      component="div"
                      className={s.error}
                    /> */}

                  <TextArea
                    label="Describe your industry"
                    name="industryDescription"
                    errors={errors}
                    touched={touched}
                    id="industryDescription"
                    placeholder="Please provide a brief description of the industry"
                    onChange={handleChange}
                    value={values.industryDescription}
                  />

                  <TextArea
                    label="Describe your Business"
                    name="businessDescription"
                    errors={errors}
                    touched={touched}
                    id="businessDescription"
                    placeholder="Please provide a brief description of the business"
                    onChange={handleChange}
                    value={values.businessDescription}
                  />
                  {/* <FieldArray name="services">
                    {(arrayHelpers) => (
                      <div>
                        {values.services &&
                          values.services.map((service: any, index: number) => (
                            <div key={index} className={s.servicesWrapper}>
                              <label htmlFor={`services.${index}.name`}>
                                Service Name
                              </label>
                              <Field
                                type="text"
                                id={`services.${index}.name`}
                                name={`services.${index}.name`}
                                onChange={handleChange}
                                onFocus={handleFocus}
                                onKeyDown={handleKeyDown}
                                onKeyUp={handleKeyUp}
                                onBlur={handleBlur}
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
                                  onClick={() =>
                                    RemoveServices(
                                      arrayHelpers,
                                      values,
                                      index,
                                      setFieldValue
                                    )
                                  }
                                >
                                  <MdCancel />
                                </button>
                              )}
                            </div>
                          ))}
                        <div className={s.addmorecontainer}>
                          <button
                            className={`${s.addmore} btn btn-primary`}
                            type="button"
                            onClick={() =>
                              AddServices(arrayHelpers, setFieldValue, values)
                            }
                          >
                            Add More Services
                          </button>
                        </div>
                      </div>
                    )}
                  </FieldArray> */}
                  <div>
                    <RadioButtonGroup
                      label="Brand Name"
                      name="includeBrandName"
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                    {values.includeBrandName === "yes" && (
                      <TextInput
                        placeholder="Type your brand name"
                        name="brandName"
                        onChange={handleChange}
                        value={values.brandName}
                      />
                    )}
                  </div>
                  {/* {Object.keys(errors).length > 0 && (
                      <div className="form-error">
                        Please fill All the information
                      </div>
                    )} */}

                  <div className="btnwrapper ">
                    <button className="btnnext btn" type="submit">
                      <a>Next</a>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Industry;
