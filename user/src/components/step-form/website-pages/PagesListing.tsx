import { ErrorMessage, Formik } from "formik";
import { useContext, useState } from "react";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";

const Pages = [
  {
    name: "Home",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "About Us",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Services",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "FAQs",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Sitemap",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Products",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Terms & Conditions",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Privacy Policy",
    desc: "Discover the story, vision and mission.",
  },
  {
    name: "Blog",
    desc: "Discover the story, vision and mission.",
  },
];
const validate = (values: any) => {
  const errors = {};

  if (!values.selectedPages || values.selectedPages.length === 0) {
    errors.selectedPages = "Please select at least one page.";
  }

  // Add other validation rules if needed

  return errors;
};
const PagesListing = () => {
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);

  // const handleCheckboxChange = (optionName: any) => {
  //   const selectedPages = [...Industrydetails.selectedPages];

  //   // Check if the option is already in the selectedPages array
  //   const index = selectedPages.indexOf(optionName);

  //   if (index !== -1) {
  //     // If it is, remove it
  //     selectedPages.splice(index, 1);
  //   } else {
  //     // If it's not, add it
  //     selectedPages.push(optionName);
  //   }
  //   // Update the Industrydetails state with the new selectedPages array
  //   setIndustryDetails({
  //     ...Industrydetails,
  //     selectedPages,
  //   });
  // };
  return (
    <div className="container">
      <div className="other-main-wrapper">
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          // validate={validate}
          onSubmit={(values: any) => {
            console.log("values", values);
            setIndustryDetails({
              ...Industrydetails,
              selectedPages: values.selectedPages,
            });
            next(7);
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="">
              <div className="title-dashboard text-center">
                What do you want to add to your {""}
                <span className="style-title">website</span>?
              </div>

              <div className="grid-class">
                {Pages.map((option, index) => (
                  <div key={option.name} className="custom-checkbox">
                    <label htmlFor={`selectedPages ${index}`}>
                      <div className="pages-listing_wrapper">
                        <div className="page_list_title">
                          <div className="left-page-Title">
                            <Image
                              src="/images/home-icon.svg"
                              alt="home"
                              height={20}
                              width={20}
                            />
                            <h6 className="page-name">{option.name}</h6>
                          </div>
                          <div>
                            <input
                              className="customCheckbox"
                              type="checkbox"
                              name={`selectedPages`}
                              id={`selectedPages ${index}`}
                              value={option.name}
                              checked={values.selectedPages.includes(
                                option.name
                              )}
                              // onChange={() => handleCheckboxChange(option.name)}

                              onChange={handleChange}
                              style={{ display: "none" }}
                            />
                            <div className="customCheckboxStyle"></div>
                          </div>
                        </div>
                        <div className="page-desc">
                          {" "}
                          <p>{option.desc}</p>
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
              <ErrorMessage
                name="selectedPages"
                component="div"
                className="form-error"
              />
              <div className="btnwrapper align-self-end ">
                <button
                  className="btnprev btn"
                  onClick={() => {
                    if (Industrydetails.hasDomain === "no") {
                      prev(5);
                    } else {
                      prev(4);
                    }
                  }}
                >
                  <a>Back</a>
                </button>
                <button className="btnnext btn" type="button">
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
export default PagesListing;
