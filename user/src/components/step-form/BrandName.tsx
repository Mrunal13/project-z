import React, { useContext, useState } from "react";
import { Formik, Field } from "formik";
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { Title } from "../base/Title";
import TextInput from "../base/form/TextInput";
import Image from "next/image";
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

const BrandName = () => {
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);

  const [nameSearch, SetNameSerch] = useState("");
  const [BrandName, SetBrandName] = useState();

  const generateBrandName = (values: any) => {
    // Add your brand name generation logic here
    console.log("Generated brand name:", values.brand_Name_search);
    SetNameSerch(values.brand_Name_search);
  };

  const handleDomainSelect = (list: any) => {
    SetBrandName(list.id);
  };
  return (
    <div className="container">
      <div className="other-main-wrapper">
        {!nameSearch && <Title title="Brand Name Generator" />}

        <Formik
          enableReinitialize={true}
          initialValues={Industrydetails}
          onSubmit={generateBrandName}
        >
          {({ handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} className="brandnameform">
              <div className="input-group">
                <Image
                  src={"/images/search-icon.svg"}
                  width={19}
                  height={19}
                  alt="search"
                  className="search-icon"
                />
                <TextInput name="brand_Name_search" onChange={handleChange} />
                <div className="input-group-append">
                  <button
                    className="input-group-text generatebtn"
                    id="basic-addon2"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
        <h2 className={s.craft_text}>
          {!nameSearch &&
            "Craft a distinctive business identity with a name that sets you apart."}
        </h2>
        {nameSearch && (
          <>
            <Title title="Best name suggestions" />
            <div className="brandName-List-wrapper">
              {data &&
                data?.map((list, index) => (
                  <div
                    key={index}
                    className="list"
                    onClick={() => handleDomainSelect(list)}
                    style={{
                      background: BrandName == list.id ? "#EBEBEB" : "",
                      borderRadius: BrandName == list.id ? "6px" : "",
                    }}
                  >
                    <h5 className="list-title">{list.title}</h5>
                    <p className="description">{list.description}</p>
                  </div>
                ))}
            </div>
          </>
        )}
        <div className="btnwrapper align-self-end ">
          <button className="btnprev btn" onClick={prev}>
            <a>Back</a>
          </button>
          <button className="btnnext btn" type="submit">
            <a>Next</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandName;
