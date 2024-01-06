import React, { useContext, useEffect, useState } from "react";
import { Formik, Field } from "formik";
// import s from "../multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import TextInput from "../../base/form/TextInput";
import Image from "next/image";
import Listing from "../../listinglayout/Listing";
import * as Yup from "yup";
const data = [
  {
    id: "1",
    title: "Queen Cuts",
    description: "Domain Available",
  },
  {
    id: "2",
    title: "Angel Hair Salon",
    description: "Domain Available",
  },
  {
    id: "3",
    title: "Natural Girls Boutique",
    description: "Domain Available",
  },
  {
    id: "4",
    title: "Money Bag Salon",
    description: "Domain Available",
  },
  {
    id: "5",
    title: "Queen Cuts",
    description: "Domain Available",
  },
];

const validationSchema = Yup.object().shape({
  domainNameSearchtext: Yup.string().required("Please add the brandName"),
  domainName: Yup.string().required("Please select  the brandName"),
});

const GenerateDomainName = () => {
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);
  const [nameSearch, SetNameSerch] = useState(
    Industrydetails.domainNameSearchtext
  );
  const [Domain, SetDomainName] = useState();

  // useEffect(() => {
  //   if (nameSearch) {
  //     setIndustryDetails((prevdata: any) => ({
  //       ...prevdata,
  //       brandNameSearchResults: "data",
  //     }));
  //   }
  // }, [nameSearch]);
  const generateBrandName = (values: any) => {
    // Add your brand name generation logic here
    SetNameSerch(values.domainNameSearchtext);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      domainNameSearchtext: values.domainNameSearchtext,
      domainNameSearchResults: data,
    }));
  };

  const handleBrandnameSelect = (list: any, setFieldValue: any) => {
    SetDomainName(list.id);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      domainName: list.title,
    }));
    setFieldValue("domainName", list.title);
  };

  return (
    <div className="container">
      <div className="other-main-wrapper">
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={() => {
            next(6);
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="brandnameform">
              {!values.domainNameSearchtext && (
                <div className="title-dashboard">
                  <span className="style-title">Domain Name </span>Generator
                </div>
              )}
              <div className="input-group">
                <Image
                  src={"/images/search-icon.svg"}
                  width={19}
                  height={19}
                  alt="search"
                  className="search-icon"
                />
                <TextInput
                  name="domainNameSearchtext"
                  onChange={handleChange}
                  value={values.domainNameSearchtext}
                />
                <div className="input-group-append">
                  <button
                    className="input-group-text generatebtn"
                    id="basic-addon2"
                    onClick={() => generateBrandName(values)}
                    type="button"
                  >
                    Generate
                  </button>
                </div>
              </div>
              <div>
                {/* {!values.domainNameSearchtext && (
                  <h2 className={s.craft_text}>
                    {" "}
                    Craft a distinctive business identity with a name that sets
                    you apart.{" "}
                  </h2>
                )} */}
                {values.domainNameSearchtext && nameSearch && (
                  <Listing
                    data={values.domainNameSearchResults}
                    BrandNameselect={(list: any) =>
                      handleBrandnameSelect(list, setFieldValue)
                    }
                    Name={values.domainName}
                    values={values}
                    handleChange={handleChange}
                  />
                )}
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
                <button
                  className="btnnext btn"
                  type="button"
                  onClick={() => next(6)}
                >
                  <a>Next</a>
                </button>
              </div>
            </form>
          )}
        </Formik>

        {/* {!nameSearch && (
          <h2 className={s.craft_text}>
            {" "}
            Craft a distinctive business identity with a name that sets you
            apart.{" "}
          </h2>
        )}
        {nameSearch && (
          <>
            <Listing
              data={data}
              BrandNameselect={handleBrandnameSelect}
              BrandName={BrandName}
            />
          </>
        )}
        <div className="btnwrapper align-self-end ">
          <button className="btnprev btn" onClick={prev}>
            <a>Back</a>
          </button>
          <button className="btnnext btn">
            <a>Next</a>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default GenerateDomainName;
