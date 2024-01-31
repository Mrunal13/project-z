import React, { useContext, useEffect, useState, useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import * as Yup from "yup";
import SvgLogo from "./svg-logo";


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
  const childRef = useRef(0);
  const {
    Industrydetails,
    setIndustryDetails,
    prev,
    next,
    logo,
    setLogo,
  }: any = useContext(MultiStepFormContext);
  const canvasRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loader,setLoader] = useState(false);
  const [count, setCount] = useState(0);
  const [activeElement, setActiveElement] = useState(null);
  // handle click for the upload  image

  const handleImageChange = (e: any, formikProps: any) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      formikProps.setFieldValue("selectedImage", file);
    }
  };

  // handle Submit the upload logo form
  const handleSelectLogo = async (values: any) => {
    // setLogo(values);
    try {
      let svgImage = '';
      document
        .querySelectorAll(".listing-domain-wrapper.logo.selected svg")
        .forEach((el) => {
          const canvas = canvasRef.current;

          //svgImage = "data:image/svg+xml;base64," + btoa(el);
          //svgImage = btoa(el);
          const s = new XMLSerializer();
          const str = s.serializeToString(el);
          svgImage = str;
          //console.log(str);
        });
      const response = await fetch("/api/image-generate", {
        method: "POST", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify({ data: svgImage }), // Convert data to JSON string
      });
      const data = await response.json();
      if (data.uniqueFileName) {
        setIndustryDetails((prevdata: any) => ({
          ...prevdata,
          hasBrandLogo: "yes",
          brandLogoImportUrl:
            window.location.origin + "/uploads/" + data.uniqueFileName,
        }));
      }
      next(4);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };
  const handleLogoSelection = async(e) => {
    //console.log(e.currentTarget);
    document.querySelectorAll(".listing-domain-wrapper.logo").forEach((el) => {
      el.classList.remove("selected");
    });

    e.currentTarget.classList.add("selected");
  }
  const generateNewLogo = async (values: any) => {
    //console.log('ss');
    //setCount(23);
    try {
      SetLoader(true);
      //console.log(Industrydetails);
      //Domain API
      datas = [
        {
          id: 1,
          title: `${Industrydetails.brandName}`,
          description: "Domain Available",
        },
      ];
      // const response = await fetch("/api/openai/logo", {
      //   method: "POST", // Use the appropriate HTTP method
      //   headers: {
      //     "Content-Type": "application/json", // Specify content type as JSON
      //   },
      //   body: JSON.stringify({ data: datas }), // Convert data to JSON string
      // });
      //const data = await response.json();
      //setReload(reload++);
      //console.log(Math.floor(Math.random()).toString(4));
      setReload(Math.floor(Math.random()).toString(4));
      SetLoader(false);
      //SetNameSerch(values.brandNameSearchtext);
      setIndustryDetails((prevdata: any) => ({
        ...prevdata,
        //brandNameSearchtext: values.brandNameSearchtext,
        brandNameSearchResults: data, // Assuming the API response is an array of objects similar to your 'data' array
      }));

      //console.log(Domaindata);
      //console.log(Industrydetails.brandNameSearchResults);
    } catch (error) {
      //console.error("Error fetching data from API:", error);
    }
  }
  
  return (
    <div className="container">
      <div className="popup-container other-main-wrapper logoform">
        {/* <Title title={`Let’s Create a Unique Logo For Your Brand!`} /> */}
        <div className="title-dashboard">
          Let’s Select a Unique <span className="style-title">Logo</span> For
          Your Brand!
        </div>
        <div className="input-group">
          {/* <div className="input-group-append">
            <button
              type="button"
              className="input-group-text generatebtn"
              id="basic-addon2"
              onClick={() => setCount(count + 1)}
            >
              Generate
            </button>
          </div> */}
        </div>
        <div className="grid-class ps-4 pe-4">
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              //count={count}
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              count={count}
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
          <div
            className="listing-domain-wrapper logo"
            onClick={(e) => {
              handleLogoSelection(e);
            }}
          >
            <SvgLogo
              logoText={Industrydetails.brandName}
              // logoColor1={Math.floor(Math.random() * 16777215).toString(16)}
              // logoColor2={Math.floor(Math.random() * 16777215).toString(16)}
              // fontSelection={Math.floor(Math.random() * (1595 - 0 + 1)) + 0}
            />
          </div>
        </div>
        <div>
          {loader == true && (
            <div class="cup">
              <div class="handle"></div>
            </div>
          )}
        </div>
        <div className="btnwrapper align-self-end ">
          <button
            className="btnprev btn"
            onClick={() => {
              //if (Industrydetails.hasBrandLogo === "no") {
              prev(2);
              //}
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