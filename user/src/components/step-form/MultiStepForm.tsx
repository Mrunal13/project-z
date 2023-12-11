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
  colorCodes: [], // Set default color codes
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
}
export interface Layout {
  readonly id: string;
  readonly name: string;
  readonly images: any;
}
export interface IndustryCategory {
  label: string;
  options: Subcategory[];
  isOther?: boolean; 
}

export interface Subcategory {
  value: string;
  label: string;
}
export const Layoutoption: Layout[] = [
  { id: "1", name: "layout one", images: "/images/layout-one.webp" },
  { id: "2", name: "layout two", images: "/images/layout-two.webp" },
  { id: "3", name: "layout three", images: "/images/layout-three.webp" },
  { id: "4", name: "layout four", images: "/images/layout-four.jpeg" },
];

export const categoryOptions: IndustryCategory[] = [
  {
    label: "Retail and E-commerce",
    options: [
      {
        value: "Retail and E-commerce",
        label: "Retail and E-commerce",
      },
      {
        value: "Online stores and marketplaces",
        label: "Online stores and marketplaces",
      },
    ],
  },
  {
    label: "Healthcare",
    options: [
      { value: "Healthcare", label: "Healthcare" },
      { value: "Medical practices", label: "Medical practices" },
      { value: "Clinics", label: "Clinics" },
      { value: "Healthcare providers", label: "Healthcare providers" },
    ],
  },
  {
    label: "Finance",
    options: [
      { value: "Finance", label: "Finance" },
      { value: "Banking", label: "Banking" },
      { value: "Investment", label: "Investment" },
      { value: "Financial management", label: "Financial management" },
    ],
  },
  {
    label: "Education",
    options: [
      { value: "Education", label: "Education" },
      { value: "Schools", label: "Schools" },
      { value: "Colleges", label: "Colleges" },
      { value: "Universities", label: "Universities" },
      { value: "E-learning platforms", label: "E-learning platforms" },
    ],
  },
  {
    label: "Technology",
    options: [
      { value: "Technology", label: "Technology" },
      { value: "Software companies", label: "Software companies" },
      { value: "IT services", label: "IT services" },
      { value: "Tech startups", label: "Tech startups" },
    ],
  },
  {
    label: "Real Estate",
    options: [
      { value: "Real Estate", label: "Real Estate" },
      { value: "Property listings", label: "Property listings" },
      { value: "Real estate agencies", label: "Real estate agencies" },
      { value: "Construction firms", label: "Construction firms" },
    ],
  },
  {
    label: "Hospitality and Tourism",
    options: [
      { value: "Hospitality and Tourism", label: "Hospitality and Tourism" },
      { value: "Hotels", label: "Hotels" },
      { value: "Travel agencies", label: "Travel agencies" },
      { value: "Tourism destinations", label: "Tourism destinations" },
    ],
  },
  {
    label: "Food and Beverage",
    options: [
      { value: "Food and Beverage", label: "Food and Beverage" },
      { value: "Restaurants", label: "Restaurants" },
      { value: "Cafes", label: "Cafes" },
      { value: "Food delivery services", label: "Food delivery services" },
    ],
  },
  {
    label: "Entertainment",
    options: [
      { value: "Entertainment", label: "Entertainment" },
      { value: "Movie theaters", label: "Movie theaters" },
      { value: "Event/Venues Management", label: "Event/Venues Management" },
      { value: "Streaming platforms", label: "Streaming platforms" },
    ],
  },
  {
    label: "Automotive",
    options: [
      { value: "Automotive", label: "Automotive" },
      { value: "Car dealerships", label: "Car dealerships" },
      { value: "Auto repair shops", label: "Auto repair shops" },
      { value: "Automotive manufacturers", label: "Automotive manufacturers" },
    ],
  },
  {
    label: "Professional Services",
    options: [
      { value: "Professional Services", label: "Professional Services" },
      { value: "Law firms", label: "Law firms" },
      { value: "Consulting companies", label: "Consulting companies" },
      { value: "Accounting services", label: "Accounting services" },
    ],
  },
  {
    label: "Nonprofit and Social Services",
    options: [
      {
        value: "Nonprofit and Social Services",
        label: "Nonprofit and Social Services",
      },
      { value: "Charities", label: "Charities" },
      { value: "NGOs", label: "NGOs" },
      { value: "Social organizations", label: "Social organizations" },
    ],
  },
  {
    label: "Government",
    options: [
      { value: "Government", label: "Government" },
      { value: "Government agencies", label: "Government agencies" },
    ],
  },
  {
    label: "Fashion",
    options: [
      { value: "Fashion", label: "Fashion" },
      { value: "Clothing brands", label: "Clothing brands" },
      { value: "Fashion retailers", label: "Fashion retailers" },
      { value: "Fashion designers", label: "Fashion designers" },
    ],
  },
  {
    label: "Sports and Fitness",
    options: [
      { value: "Sports and Fitness", label: "Sports and Fitness" },
      { value: "Sports teams", label: "Sports teams" },
      { value: "Fitness centers", label: "Fitness centers" },
      { value: "Athletic clubs", label: "Athletic clubs" },
    ],
  },
  {
    label: "Art and Design",
    options: [
      { value: "Art and Design", label: "Art and Design" },
      { value: "Art galleries", label: "Art galleries" },
      { value: "Design agencies", label: "Design agencies" },
      { value: "Individual artists", label: "Individual artists" },
    ],
  },
  {
    label: "Media and Journalism",
    options: [
      { value: "Media and Journalism", label: "Media and Journalism" },
      { value: "News outlets", label: "News outlets" },
      { value: "Magazines", label: "Magazines" },
      { value: "Publishing companies", label: "Publishing companies" },
    ],
  },
  {
    label: "Transportation and Logistics",
    options: [
      {
        value: "Transportation and Logistics",
        label: "Transportation and Logistics",
      },
      { value: "Shipping companies", label: "Shipping companies" },
      { value: "Logistics providers", label: "Logistics providers" },
      { value: "Transportation services", label: "Transportation services" },
    ],
  },
  {
    label: "Energy and Utilities",
    options: [
      {
        value: "Energy and Utilities",
        label: "Energy and Utilities",
      },
      {
        value: "Energy companies and utility providers",
        label: "Energy companies and utility providers",
      },
    ],
  },
  {
    label: "Agriculture",
    options: [
      { value: "Agriculture", label: "Agriculture" },
      { value: "Farms", label: "Farms" },
      {
        value: "Agricultural product suppliers",
        label: "Agricultural product suppliers",
      },
      { value: "Agribusinesses", label: "Agribusinesses" },
    ],
  },
  {
    label: "Telecommunications",
    options: [
      { value: "Telecommunications", label: "Telecommunications" },
      { value: "Internet Provider", label: "Internet Provider" },
      { value: "Phone/TV", label: "Phone/TV" },
      { value: "Phone/TV services", label: "Phone/TV services" },
    ],
  },
  {
    label: "Environmental Services",
    options: [
      {
        value: "Environmental Services",
        label: "Environmental Services",
      },
      {
        value: "Environmental organizations",
        label: "Environmental organizations",
      },
      {
        value: "Companies focused on sustainability",
        label: "Companies focused on sustainability",
      },
    ],
  },
  {
    label: "Marketing and Advertising",
    options: [
      {
        value: "Marketing and Advertising",
        label: "Marketing and Advertising",
      },
      { value: "Marketing agencies", label: "Marketing agencies" },
      { value: "Advertising firms", label: "Advertising firms" },
      { value: "PR companies", label: "PR companies" },
    ],
  },
  {
    label: "Fitness and Wellness",
    options: [
      { value: "Fitness and Wellness", label: "Fitness and Wellness" },
      { value: "Gyms", label: "Gyms" },
      { value: "Wellness centers", label: "Wellness centers" },
      {
        value: "Health-focused businesses",
        label: "Health-focused businesses",
      },
    ],
  },
  {
    label: "Other",
    isOther: true,
  },
  // Add other categories...
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
        Layoutoption,
      }}
    >
      <div className={s.stepwrapper}>
        <div className="container">
          {/* <img src="/images/layout-one.webp" alt="" /> */}
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
