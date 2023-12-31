import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import TextInput from "../base/form/TextInput";
import Image from "next/image";
import Listing from "../listinglayout/Listing";
import * as Yup from "yup";
const datas = [
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
    title: "The Sweet Touch Salon",
    description: "Domain Available",
  },
  {
    id: "6",
    title: "The Closeup Salon",
    description: "Domain Available",
  },
  {
    id: "7",
    title: "Happy Hair Salon",
    description: "Domain Available",
  },
  {
    id: "8",
    title: "Sunny Street Salon",
    description: "Domain Available",
  },
  {
    id: "9",
    title: "Style Salon",
    description: "Domain Available",
  },
  {
    id: "10",
    title: "Loveable Locks Salon",
    description: "Domain Available",
  },
  {
    id: "11",
    title: "Hair Repair",
    description: "Domain Available",
  },
  {
    id: "12",
    title: "The Babe Spot",
    description: "Domain Available",
  },
  {
    id: "13",
    title: "Style Street Salon",
    description: "Domain Available",
  },
  {
    id: "13",
    title: "Sassy Life Salon",
    description: "Domain Available",
  },
  {
    id: "14",
    title: "Pretty Girlz Rock Salon",
    description: "Domain Available",
  },
];

const validationSchema = Yup.object().shape({
  brandNameSearchtext: Yup.string().required("Please add the brandName"),

  brandName: Yup.string().required("Please select the brandName"),
});

const BrandName = () => {
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);
  const [nameSearch, SetNameSerch] = useState(
    Industrydetails.brandNameSearchtext
  );
  const [brandName, setBrandName] = useState("");
  const [Domaindata, SetDomainData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  console.log("Domaindata", Domaindata);

  useEffect(() => {
    if (Industrydetails.brandNameSearchResults) {
      SetDomainData(Industrydetails.brandNameSearchResults);
    }
  }, [Industrydetails]);

  const generateBrandName = async (values: any) => {
    try {
      const response = await fetch("/api/godaddy/domains", {
        method: "POST", // Use the appropriate HTTP method
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },
        body: JSON.stringify({ data: datas }), // Convert data to JSON string
      });
      const data = await response.json();
      SetDomainData(data);
      // Process the API response data as needed
      console.log(data);

      SetNameSerch(values.brandNameSearchtext);
      setIndustryDetails((prevdata: any) => ({
        ...prevdata,
        brandNameSearchtext: values.brandNameSearchtext,
        brandNameSearchResults: data, // Assuming the API response is an array of objects similar to your 'data' array
      }));
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const handleBrandnameSelect = (list: any, setFieldValue: any) => {
    setBrandName(list);
    setSelectedBrand(null); // Reset selectedBrand when a new brand name is selected
    setSelectedDomain(null);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      brandName: "",
      domainName: "",
    }));
    setFieldValue("brandName", list.title);
  };
  return (
    <div className="container">
      <div className="other-main-wrapper">
        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          validationSchema={validationSchema}
          onSubmit={() => {
            next(2);
          }}
        >
          {({ handleSubmit, handleChange, values, setFieldValue }) => (
            <form onSubmit={handleSubmit} className="brandnameform">
              {!nameSearch && (
                <div className="title-dashboard">
                  <span className="style-title">Brand Name </span>Generator
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
                  name="brandNameSearchtext"
                  onChange={handleChange}
                  value={values.brandNameSearchtext}
                />

                <div className="input-group-append">
                  <button
                    className="input-group-text generatebtn"
                    id="basic-addon2"
                    onClick={() => generateBrandName(values)}
                  >
                    Generate
                  </button>
                </div>
              </div>
              <div>
                {!nameSearch && (
                  <h2 className={s.craft_text}>
                    {" "}
                    Craft a distinctive business identity with a name that sets
                    you apart.{" "}
                  </h2>
                )}
                {nameSearch && (
                  <>
                    <Listing
                      data={Domaindata || values.brandNameSearchResults}
                      BrandNameselect={(list: any) =>
                        handleBrandnameSelect(list, setFieldValue)
                      }
                      values={values}
                      handleChange={handleChange}
                      setBrandName={setBrandName}
                      selectedBrand={selectedBrand}
                      selectedDomain={selectedDomain}
                      setSelectedBrand={setSelectedBrand}
                      setSelectedDomain={setSelectedDomain}
                    />
                    <ErrorMessage
                      name="brandName"
                      component="div"
                      className="form-error"
                    />
                  </>
                )}
              </div>
              <div className="btnwrapper align-self-end ">
                <button className="btnprev btn" onClick={() => prev(0)}>
                  <a>Back</a>
                </button>
                <button className="btnnext btn " type="submit">
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

export default BrandName;
