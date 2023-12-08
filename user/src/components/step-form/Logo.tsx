import React, { useContext, useEffect, useState } from "react";
import { ErrorMessage, Field, Formik } from "formik";
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
  console.log("selectedImage", selectedImage);

  const { logo, setLogo, next, prev }: any = useContext(MultiStepFormContext);
  // useEffect(() => {
  //   setSelectedImage(logo?.selectedImage || null);
  // }, [logo]);

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
            console.log("values", values);
            setLogo(values);
            next();
          }}
        >
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <div className={s.formwrapper}>
                <label>Do you have a logo</label>
                <div>
                  <label>
                    <Field
                      type="radio"
                      name="includeImage"
                      value="yes"
                      onChange={formikProps.handleChange}
                    />
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
                    No
                  </label>
                </div>
                <ErrorMessage
                  name="includeImage"
                  component="div"
                  className={s.error}
                />
              </div>

              {/* Conditionally render the image uploader based on the radio button value */}
              {formikProps.values.includeImage === "yes" && (
                <div>
                  <label htmlFor="imageInput">Upload Image:</label>
                  <input
                    name="selectedImage"
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, formikProps)}
                  />
                  <ErrorMessage
                    name="selectedImage"
                    component="div"
                    className={s.error}
                  />

                  {/* Display the selected image */}
                  {formikProps.values.selectedImage && (
                    <div>
                      <p>Selected Image Preview:</p>
                      <img
                        src={URL.createObjectURL(
                          formikProps.values.selectedImage
                        )}
                        alt="Selected"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                </div>
              )}

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
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Logo;
