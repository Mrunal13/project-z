import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import CreatableSelect from "react-select/creatable";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
import { Title } from "../../base/Title";
import { Label } from "../../base/form/Label";
import TextArea from "../../base/form/TextArea";
import TextInput from "../../base/form/TextInput";
import RadioButtonGroup from "../../base/form/RadioButtongroup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
             .email('Invalid email address') // Validates the email format
             .required('Email is required'), // Makes this field required

  // Phone field validation
  phone: Yup.string()
             .matches('/^\+?(\d{1,3})\s?(\d{1,3})\s?(\d{4,})$/', 'Phone number is not valid')
             .required('Phone is required'), // Makes this field required

  // Address field validations
  street: Yup.string()
              .required('Street address is required'),
  city: Yup.string()
           .required('City is required'),
  country: Yup.string()
              .required('Country is required'),
  zip: Yup.string()
          .required('Zip code is required')
});
const PersonalDetails = () => {
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
      //setFieldValue("industryCategory", inputValue);
      setFieldValue("industryCategory", `${newValue?.label}-${newValue?.group}`);
    } catch (error) {
      console.error("Error creating subcategory:", error);
      // Handle error (e.g., show a user-friendly message)
    }
  };

  //Handle submit industry form
  const IndustryFormSubmit = (values: any) => {
    //console.log(values);
    // You can handle form submission here
    setIndustryDetails(values);
    // Call next() to proceed to the next step
    if (values.hasBrandName === "yes") {
      values.brandNameSearchtext = values.brandName;
      values.hasBrandName = 'no';
      next(1);
    } else {
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
          Please fill the following <span className="style-title">details</span>{" "}
        </div>
        {/* <p className="small-heading">
          Lorem ipsum dolor sit amet consectetur. Facilisi in iaculis{" "}
        </p> */}
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
                  <TextInput
                    label="Email"
                    name="email"
                    // ... other props ...
                  />

                  {/* <ErrorMessage
                      name="industryCategory"
                      component="div"
                      className={s.error}
                    /> */}

                  <TextInput
                    label="Phone"
                    name="phone"
                    // ... other props ...
                  />

                  <TextInput
                    label="Street Address"
                    name="street"
                    // ... other props ...
                  />

                  <TextInput
                    label="City"
                    name="city"
                    // ... other props ...
                  />

                  <TextInput
                    label="Country"
                    name="country"
                    className="form-control country"
                    // ... other props ...
                  />

                  <TextInput
                    label="ZIP Code"
                    name="zip"
                    className="form-control zip"
                    // ... other props ...
                  />
                  {/* {Object.keys(errors).length > 0 && (
                      <div className="form-error">
                        Please fill All the information
                      </div>
                    )} */}

                  {/* <div className="btnwrapper ">
                    <button className="btnnext btn" type="submit">
                      <a>Next</a>
                    </button>
                  </div> */}
                  <div className="btnwrapper align-self-end ">
                    <button
                      className="btnprev btn"
                      onClick={() => {
                        prev(5);
                      }}
                    >
                      <a>Back</a>
                    </button>
                    <button
                      className="btnnext btn"
                      onClick={() => {
                        next(7);
                      }}
                    >
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

export default PersonalDetails;