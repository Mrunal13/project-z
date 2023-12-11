import React, { useState } from "react";
// import Details from "./Details";
// import Address from "./Address";
// import Review from "./Review";
import { Provider } from "@/provider/MultiStepForm";
import Industry from "./Industry";
import BrandName from "./BrandName";
import Logo from "./Logo";
import Domain from "./Domain";
import s from "./multiplestep.module.css";
import WebsiteTemp from "./WebsiteTem";

// const { Step } = Steps;

const detailsInitialState = {
  industryCategory: "",
  industryDescription: "",
  businessDescription: "",
  includeBrandName: "",
  brandName: "",
};
const logodetails = {
  includeImage: "",
  selectedImage: null,
};
const Domaindetails = {
  isdomain: "",
  domainName: "",
};

const WebsiteLayoutDetails = {
  selectedPages: [],
  colorCodes: ["red", "purple", "yellow"], // Set default color codes
  contactDetails: {
    phone: "",
    email: "",
    address: "",
  },
  selectedLayouts: [],
};
export interface IndustryCategory {
  name: string;
  label: string;
}
export interface WebsitePageLayoutOption {
  readonly value: string;
  readonly label: string;
}

export const categoryOptions: IndustryCategory[] = [
  { name: "Commerce", label: "Commerce" },
  { name: "Construction", label: "Construction" },
  { name: "Chemical industries", label: "Chemical industries" },
  { name: "Basic Metal Production", label: "Basic Metal Production" },
];
export const PageOption: readonly WebsitePageLayoutOption[] = [
  { value: "Home", label: "Home" },
  { value: "About Us", label: " About Us" },
  { value: "Contact Us", label: "Contact Us" },
  { value: "Services", label: "Services" },
  { value: "Success Story", label: "Success Story" },
];

const renderStep = (step: Number) => {
  switch (step) {
    case 0:
      return <Industry />;
    case 1:
      return <BrandName />;
    case 2:
      return <Logo />;
    case 3:
      return <Domain />;
    case 4:
      return <WebsiteTemp />;
    default:
      return null;
  }
};

const MultiStepForm = () => {
  const [Industrydetails, setIndustryDetails] = useState(detailsInitialState);
  const [logo, setLogo] = useState(logodetails);
  const [category, SetCategory] = useState(categoryOptions);
  const [domain, setdomain] = useState(Domaindetails);
  const [layoutDetails, setLayoutdetails] = useState(WebsiteLayoutDetails);
  console.log("layoutDetails0", layoutDetails);

  // console.log("logo", logo, Industrydetails, domain);

  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === 4) {
      setCurrentStep(0);
      setIndustryDetails(detailsInitialState);
      setLogo(logodetails);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);
  return (
    <Provider
      value={{
        Industrydetails,
        setIndustryDetails,
        next,
        prev,
        setLogo,
        logo,
        categoryOptions,
        SetCategory,
        category,
        domain,
        setdomain,
        PageOption,
        layoutDetails,
        setLayoutdetails,
      }}
    >
      <div className={s.stepwrapper}>
        <div className="container">
          <h5 className="text-center">Step {currentStep + 1}</h5>
          <p className="text-center">step {currentStep + 1} out of 5</p>
          {/* <Steps current={currentStep}>
        <Step title={"Fill in your details"} />
        <Step title={"Address details"} />
        <Step title={"Review and Save"} />
      </Steps> */}
          <main>{renderStep(currentStep)}</main>
        </div>
      </div>
    </Provider>
  );
};
export default MultiStepForm;
