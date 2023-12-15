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

const Logo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { logo, setLogo, next, prev }: any = useContext(MultiStepFormContext);
  const handleImageChange = (e: any, formikProps: any) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      formikProps.setFieldValue("selectedImage", file);
    }
  };
  return (
    <div className={s.stepswrapper}>
      <div className={s.maincard}>
        <Formik
          initialValues={logo}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setLogo(values);
            next();
          }}
        >
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className={s.formwrapper}>
                <div>
                  <label>Do you have a logo?</label>
                  <span className={s.radiogroup}>
                    <label>
                      <Field
                        type="radio"
                        name="includeImage"
                        value="yes"
                        onChange={formikProps.handleChange}
                      />
                      {/* <span className={s.customradio}></span> */}
                      Yes
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="includeImage"
                        value="no"
                        onChange={formikProps.handleChange}
                        onClick={() => {
                          formikProps.setFieldValue("selectedImage", "");
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
                <ErrorMessage
                  name="includeImage"
                  component="div"
                  className={s.error}
                />

                {/* Conditionally render the image uploader based on the radio button value */}
                {formikProps.values.includeImage === "yes" && (
                  <>
                    <label> Upload Logo:</label>
                    <label htmlFor="imageInput" className={s.uploadwrapper}>
                      <input
                        name="selectedImage"
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, formikProps)}
                        style={{ display: "none" }}
                      />
                      <img src="/images/upload.png" alt="" />
                    </label>
                    <label htmlFor="">
                      {formikProps?.values?.selectedImage?.name}
                    </label>
                    <ErrorMessage
                      name="selectedImage"
                      component="div"
                      className={s.error}
                    />
                    {formikProps.values.selectedImage && (
                      <div className={s.previewwrapper}>
                        <label>Selected Logo Preview:</label>
                        <img
                          src={URL.createObjectURL(
                            formikProps.values.selectedImage
                          )}
                          alt="Selected"
                        />
                      </div>
                    )}
                  </>
                )}
                {/* Display the selected image */}
                <div className={s.btnwrapper}>
                  <button className={`${s.btnprev} mt-4`} onClick={prev}>
                    Back
                  </button>
                  <button
                    className={`${s.btnnext} mt-4`}
                    type="submit"
                    // onClick={next}
                  >
                    Next
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Logo;
