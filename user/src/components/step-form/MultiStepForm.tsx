import React, { useState } from "react";
import { Provider } from "@/provider/MultiStepForm";
import Industry from "./Industry";
import BrandName from "./BrandName";
import Logo from "./Logo";
import Domain from "./Domain";
import s from "./multiplestep.module.css";
import WebsiteTemp from "./websitelayout/WebsiteTem";
import { categoryOptions } from "./data"; 

const IndustrydetailsInitialState = {
  industryCategory: "",
  industryDescription: "",
  businessDescription: "",
  includeBrandName: "",
  brandName: "",
  numberOfServices: 1,
  services: [{ name: "" }],
};
const logodetails = {
  includeImage: "",
  selectedImage: null,
};
const Domaindetails = {
  isdomain: "",
  // domainName: "",
};

const WebsiteLayoutDetails = {
  selectedPages: [],
  colorCodes: ["#37d67a", "#ff8a65"], // Set default color codes
  contactDetails: {
    phone: "",
    email: "",
    address: "",
  },
  selectedLayouts: [],
};

export interface WebsitePageLayoutOption {
  readonly value: string;
  readonly label: string;
  readonly id: string;
}
export interface Layout {
  readonly id: string;
  readonly name: string;
  readonly images: any;
}

export const Layoutoption: Layout[] = [
  { id: "1", name: "layout one", images: "/images/layout-one.webp" },
  { id: "2", name: "layout two", images: "/images/layout-two.webp" },
  { id: "3", name: "layout three", images: "/images/layout-three.webp" },
  { id: "4", name: "layout four", images: "/images/layout-four.jpeg" },
];

export const PageOption: readonly WebsitePageLayoutOption[] = [
  { value: "Home", label: "Home", id: "1" },
  { value: "About Us", label: " About Us", id: "2" },
  { value: "Contact Us", label: "Contact Us", id: "3" },
  { value: "Services", label: "Services", id: "4" },
  { value: "Success Story", label: "Success Story", id: "5" },
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
  const [Industrydetails, setIndustryDetails] = useState(
    IndustrydetailsInitialState
  );
  const [logo, setLogo] = useState(logodetails);
  const [category, SetCategory] = useState(categoryOptions);
  const [domain, setdomain] = useState(Domaindetails);
  const [layoutDetails, setLayoutdetails] = useState(WebsiteLayoutDetails);
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    if (currentStep === 4) {
      setCurrentStep(0);
      setIndustryDetails(IndustrydetailsInitialState);
      setLogo(logodetails);
      setdomain(Domaindetails);
      setLayoutdetails(WebsiteLayoutDetails);
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
        Layoutoption,
      }}
    >
      <div className={s.stepwrapper}>
        <div className="container">
          <h5 className="text-center mb-1">Step {currentStep + 1}</h5>
          <p className="text-center">step {currentStep + 1} out of 5</p>
          <main>{renderStep(currentStep)}</main>
        </div>
      </div>
    </Provider>
  );
};
export default MultiStepForm;
