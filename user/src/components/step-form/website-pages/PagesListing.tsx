import { Formik } from "formik";
import { useContext, useState } from "react";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
const PagesListing = () => {
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);
  const [selectedOption, setSelectedOption] = useState("");

  const Pages = [
    {
      name: "Home",
      desc: "Discover the story, vision and mission.",
    },
    {
      name: "About Us",
      desc: "Discover the story, vision and mission.",
    },
  ];
  return (
    <div className="container">
      <div className="other-main-wrapper">
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          onSubmit={() => {
            next(7);
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="">
              <div className="title-dashboard">
                What do you want to add to your {""}
                <span className="style-title">website</span>?
              </div>

              <div className="checkbox-group">
                {Pages.map((option, index) => (
                  <div key={option.name} className="custom-checkbox">
                    <label htmlFor={`selectedOptions ${index}`}>
                      <div className="pages-listing_wrapper">
                        <div className="page_list_title">
                          <div className="left-page-Title">
                            <Image
                              src="/images/home-icon.svg"
                              alt="home"
                              height={20}
                              width={20}
                            />
                            <h6 className="page-name">Home</h6>
                          </div>
                          <div>
                            <input
                              className="customCheckbox"
                              type="checkbox"
                              name={`selectedOptions ${index}`}
                              id={`selectedOptions ${index}`}
                              value={option.name}
                              //   checked={selectedOption.includes(option)}
                              //   onChange={(e) => setSelectedOption(e.target.value)}
                              style={{ display: "none" }}
                            />
                            <div className="customCheckboxStyle"></div>
                          </div>
                        </div>
                        <div className="page-desc">
                          {" "}
                          <p>Discover the story, vision and mission.</p>
                        </div>
                      </div>

                      {/* <div
                      className={`circle ${
                        selectedOption.includes(option) ? "filled" : ""
                      }`}
                    ></div> */}
                    </label>
                    {/* <label>{`Option ${option.charAt(
                      option.length - 1
                    )}`}</label> */}
                  </div>
                ))}
              </div>

              <div className="btnwrapper align-self-end ">
                <button
                  className="btnprev btn"
                  onClick={() => {
                    if (Industrydetails.hasDomain === "no") {
                      prev(4);
                    }
                  }}
                >
                  <a>Back</a>
                </button>
                <button className="btnnext btn">
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
