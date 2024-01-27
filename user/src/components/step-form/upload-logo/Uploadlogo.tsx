import { useContext } from "react";
import { Title } from "../../base/Title";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { ErrorMessage, Formik } from "formik";
import s from "./multiplestep.module.css";
import Image from "next/image";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  hasBrandLogo: Yup.string().required(
    "Please select whether to include an image"
  ),

  brandLogoIcon: Yup.mixed().when("hasBrandLogo", {
    is: (value: any) => value === "yes",
    then: (schema) => schema.required("Please Upload image"),
    otherwise: (schema) => schema,
  }),
});

const UploadLogo = () => {
  const { Industrydetails, setIndustryDetails, prev, next }: any =
    useContext(MultiStepFormContext);

  const handleHaslogo = (value: string, setFieldValue: any) => {
    setFieldValue("hasBrandLogo", value);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      hasBrandLogo: value,
    }));
  };
  const handleImageChange = async (e: any, setFieldValue: any) => {
    const file = e.target.files[0];
    console.log(file);
    try {
      //Upload Image API
      
      var formdata = new FormData();
      //formdata.append("image", e.target.files);
      formdata.append("image", file);
      //formdata.append('imageName',file.name);
      //console.log(formdata);
      const response = await fetch("/api/imageUpload", {
        method: "POST", // Use the appropriate HTTP method
        // headers: {
        //   "Content-Type": "application/json", // Specify content type as JSON
        // },
        body: formdata, // Convert data to JSON string
      });
      const data = await response.json();
      if(data.uniqueFileName){
        setIndustryDetails((prevdata: any) => ({
          ...prevdata,
          hasBrandLogo: "yes",
          brandLogoImportUrl:
            window.location.origin + "/uploads/" + data.uniqueFileName,
        }));
      }
      console.log(Industrydetails);
    } catch (error) {
      //console.error("Error fetching data from API:", error);
    }
    if (file) {
      //   setSelectedImage(file);
      setFieldValue("brandLogoIcon", file);
      setIndustryDetails((prevdata: any) => ({
        ...prevdata,
        brandLogoIcon: file,
      }));
    }
  };

  const handleDrop = (e: any, setFieldValue: any) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      setFieldValue("brandLogoIcon", file);
      setIndustryDetails((prevdata: any) => ({
        ...prevdata,
        brandLogoIcon: file,
      }));
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleLogoSubmit = (values: any) => {
    console.log("values", values);

    if (values.hasBrandLogo == "yes") {
      next(4);
    } else {
      next(3);
    }
  };
  return (
    <div className="container">
      <div className=" other-main-wrapper">
        {/* <Title title={`Let’s Create a Unique Logo For Your Brand!`} /> */}
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={handleLogoSubmit}
        >
          {({ handleSubmit, handleChange, setFieldValue, values }) => (
            <form onSubmit={handleSubmit} className="popup-container">
              <div className="title-dashboard">
                Let’s Create a Unique <span className="style-title">Logo</span>{" "}
                For Your Brand!
              </div>
              {Industrydetails.hasBrandLogo !== "yes" && (
                <>
                  <h5 className="popup-title">Do you Already have a Logo?</h5>
                  <div className="popup-btncontainer">
                    <button onClick={() => handleHaslogo("yes", setFieldValue)}>
                      Yes
                    </button>
                    <button onClick={() => handleHaslogo("no", setFieldValue)}>
                      No
                    </button>
                  </div>
                  <ErrorMessage
                    name="hasBrandLogo"
                    component="div"
                    className="form-error"
                  />
                </>
              )}
              {Industrydetails.hasBrandLogo === "yes" && (
                <div className="uploadimage-wrapper">
                  <div className="imageupload-card">
                    <Image
                      src={"/images/cancel-icon.svg"}
                      width={26}
                      height={26}
                      alt="cancel"
                      className="cancel-icon"
                      onClick={() => {
                        console.log("cancel click");

                        setIndustryDetails((prevdata: any) => ({
                          ...prevdata,
                          hasBrandLogo: "",
                          brandLogoIcon: "",
                        }));
                      }}
                    />
                    <p className="title">Upload Logo</p>
                    <label
                      htmlFor="imageInput"
                      className="upload-root"
                      onDrop={(e) => handleDrop(e, setFieldValue)}
                      onDragOver={handleDragOver}
                    >
                      <input
                        name="brandLogoIcon"
                        type="file"
                        id="imageInput"
                        accept="image,.PNG,.JPG,.JPEG,.WEBP"
                        onChange={(e) => handleImageChange(e, setFieldValue)}
                        style={{ display: "none" }}
                        className="form-control"
                      />
                      <div className="image-des">
                        <Image
                          src="/images/upload-icon.svg"
                          alt="upload"
                          width={38}
                          height={38}
                          className="upload-icon"
                        />
                        <span className="image-des-title">
                          Drop your image here,or{" "}
                          <a style={{ color: "#1F4690", fontWeight: 500 }}>
                            browse
                          </a>
                        </span>
                        <p>Supports: PNG, JPG, JPEG, WEBP</p>
                      </div>
                    </label>
                    {values?.brandLogoIcon?.name && (
                      <label htmlFor="">{values?.brandLogoIcon?.name}</label>
                    )}
                    <div className="upload-image-footer">
                      <div className="left-help-text">
                        <Image
                          width={18}
                          height={18}
                          alt="help-center"
                          src={"/images/help-icon.svg"}
                        />
                        <p>Help center</p>
                      </div>
                      <div className="imgUpload-btnwrapper">
                        <button className="cancel">Cancel</button>
                        <button className="done">Done</button>
                      </div>
                    </div>
                  </div>
                  <ErrorMessage
                    name="brandLogoIcon"
                    component="div"
                    className="form-error"
                  />
                </div>
              )}
              <div className="btnwrapper align-self-end ">
                <button
                  className="btnprev btn"
                  onClick={() => {
                    // if (Industrydetails.hasBrandName == "no") {
                    //   prev(1);
                    // } else {
                    //   prev(1);
                    // }
                    prev(1);
                  }}
                >
                  <a>Back</a>
                </button>
                <button className="btnnext btn" type="submit">
                  <a>Next</a>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default UploadLogo;
