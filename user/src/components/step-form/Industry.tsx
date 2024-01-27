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
  industry: Yup.string()
    .required("Industry Description is required")
    .max(1000, "Must be 1000 characters or less"),
  business: Yup.string()
    .required("Business Description is required")
    .max(1000, "Must be 1000 characters or less"),
  hasBrandName: Yup.string().required(
    "Please select whether to include Brand Name"
  ),
  brandName: Yup.string().when("hasBrandName", {
    is: (value: any) => value === "yes",
    then: (schema) =>
      schema.required("Brand Name is required when including it"),
    otherwise: (schema) => schema,
  }),
  hasDomain: Yup.string().when("hasBrandName", {
    is: (value: any) => value === "yes",
    then: (schema) => schema.required("Domain option is required"),
    otherwise: (schema) => schema,
  }),
  domainName: Yup.string().when(["hasBrandName", "hasDomain"], {
    is: (values) => values[0] == "yes" && values[1] == "yes",
    then: Yup.string().required("Domain name is required"),
    otherwise: (schema) => schema,
  }),
});
var ErrorKey = '';

const Industry = () => {
  const {
    Industrydetails,
    setIndustryDetails,
    next,
    SetCategory,
    category,
    setMutate,
  }: any = useContext(MultiStepFormContext);
  console.log(Industrydetails);
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
      //setFieldValue("industryCategory", inputValue);
      setFieldValue("industryCategory", `${newValue?.label}-${newValue?.group}`);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  //Handle submit industry form
  const IndustryFormSubmit = (values: any) => {
    console.log(values);
    // You can handle form submission here
    setIndustryDetails(values);
    // Call next() to proceed to the next step
    if (values.hasBrandName === "yes") {
      values.brandNameSearchtext = values.brandName;
      if (values.hasDomain === "no") {
        next(1);
      }else{
        //values.hasBrandName = 'no';
        next(2);
      }
    }else {
      //next(2);
      next(1);
    }
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
        <Image
          src="/images/left-img.svg"
          alt="leftsideimage"
          width={500}
          height={510}
        />
      </div>
      <div className="rightSection ">
        {/* <Title title="What industry? Describe industry briefly." /> */}
        <div className="title-dashboard">
          What industry? Describe <span className="style-title">industry</span>{" "}
          briefly
        </div>
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
                    //data={Industrydetails.industryCategory?.split("-")[1]}
                    onFocus={handleFocus}
                    value={category
                      .flatMap((category: any) => category.options)
                      .find(
                        (option: any) =>
                          option?.label ===
                          values.industryCategory?.split("-")[0]
                      )}
                    onCreateOption={(inputValue) =>
                      handleCategoryCreate(inputValue, setFieldValue)
                    }
                    onChange={(newValue) => {
                      console.log(Industrydetails);
                      setFieldValue(
                        "industryCategory",
                        `${newValue?.label}-${newValue?.group}`
                      );
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
                    name="industry"
                    errors={errors}
                    touched={touched}
                    id="industry"
                    placeholder="Please provide a brief description of the industry"
                    onChange={handleChange}
                    value={values.industry}
                  />

                  <TextArea
                    label="Describe your Business"
                    name="business"
                    errors={errors}
                    touched={touched}
                    id="business"
                    placeholder="Please provide a brief description of the business"
                    onChange={handleChange}
                    value={values.business}
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
                      label="Do you have Brand Name?"
                      name="hasBrandName"
                      options={[
                        { value: "yes", label: "Yes" },
                        { value: "no", label: "No" },
                      ]}
                    />
                    {values.hasBrandName === "yes" && (
                      <TextInput
                        placeholder="Type your brand name"
                        name="brandName"
                        //onChange={e => {handleChange; }}
                        onChange={handleChange}
                        value={values.brandName}
                      />
                    )}
                  </div>
                  <div>
                    {values.hasBrandName === "yes" && (
                      <RadioButtonGroup
                        label="Do you have Domain?"
                        name="hasDomain"
                        options={[
                          { value: "yes", label: "Yes" },
                          { value: "no", label: "No" },
                        ]}
                      />
                    )}
                    {values.hasDomain === "yes" &&
                      values.hasBrandName === "yes" && (
                        <TextInput
                          placeholder="Type your domain name"
                          name="domainName"
                          //onChange={e => {handleChange; }}
                          onChange={handleChange}
                          value={values.domainName}
                        />
                      )}
                  </div>
                  {Object.keys(errors).length > 0 && (
                    <div className="form-error">
                      {Object.keys(errors).map((key, index) => {
                        // Only show the error if the field has been touched
                        if (index == 0 || touched[key]) {
                          return <span key={index}>{errors[key]}</span>;
                        }
                        return null;
                      })}
                    </div>
                  )}

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