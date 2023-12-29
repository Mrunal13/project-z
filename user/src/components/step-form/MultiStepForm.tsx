import React, { useEffect, useState } from "react";
import { Provider } from "@/provider/MultiStepForm";
import Industry from "./Industry";
import BrandName from "./BrandName";
import UploadLogo from "./UploadLogo";
import Domain from "./Domain";
import WebsiteTemp from "./websitelayout/WebsiteTem";
import Logo from "../layout/logo";

const IndustrydetailsInitialState = {
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
};

const WebsiteLayoutDetails = {
  selectedPages: [], // set the selected pages.
  colorCodes: [{ primaryColor: "#37d67a", secondaryColor: "#ff8a65" }], // Set default color codes.
  selectedLayouts: [], //add the slected layout option.
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

type CategoryItem = {
  label: unknown;
  options: any;
};
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

const MultiStepForm = () => {
  const [Industrydetails, setIndustryDetails] = useState(
    IndustrydetailsInitialState
  );
  console.log("Industrydetails", Industrydetails);

  const [logo, setLogo] = useState(logodetails);
  const [category, SetCategory] = useState<CategoryItem[]>([]);
  const [mutate, setMutate] = useState(false);
  const [domain, setdomain] = useState(Domaindetails);
  const [layoutDetails, setLayoutdetails] = useState(WebsiteLayoutDetails);
  const [currentStep, setCurrentStep] = useState(0);
  console.log("mutate", mutate);

  useEffect(() => {
    getCategory();
  }, [mutate]);

  async function getCategory() {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      // Assuming the response is an array of category options

      const uniqueCategories = [
        ...new Set(data?.map((item: any) => item.category)),
      ];
      const finalUniqCategory = uniqueCategories.map((cat) => {
        const subcategoriesForCategory = data
          .filter((subcategory: any) => subcategory.category === cat)
          .map((subcategory: any) => ({
            value: subcategory.subCategory,
            label: subcategory.subCategory,
          }));

        return {
          label: cat,
          options: subcategoriesForCategory,
        };
      });
      SetCategory(finalUniqCategory);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Handle the error as needed
    }
  }

  // handle the stepform move to next form
  const next = () => {
    if (currentStep === 4) {
      setCurrentStep(0);
      setIndustryDetails(IndustrydetailsInitialState);
      setLogo(logodetails);
      setdomain(Domaindetails);
      // setLayoutdetails(WebsiteLayoutDetails);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  // move to prev step form
  const prev = () => setCurrentStep(currentStep - 1);
  const renderStep = (step: Number) => {
    switch (step) {
      case 0:
        return (
          <>
            {category && (
              <>
                <Logo /> <Industry />{" "}
              </>
            )}
          </>
        );
      case 1:
        if (Industrydetails?.includeBrandName == "no") {
          return (
            <>
              <Logo showDefault={false} />
              <BrandName />
            </>
          );
        }
      case 2:
        return (
          <>
            <Logo showDefault={false} />
            <UploadLogo />
          </>
        );
      case 3:
        return <Domain />;
      case 4:
        return <WebsiteTemp />;
      default:
        return null;
    }
  };

  return (
    <Provider
      value={{
        Industrydetails,
        setIndustryDetails,
        next,
        prev,
        setLogo,
        logo,
        SetCategory,
        category,
        domain,
        setdomain,
        PageOption,
        layoutDetails,
        setLayoutdetails,
        Layoutoption,
        setMutate,
      }}
    >
      <Logo />
      <main>{renderStep(currentStep)}</main>
    </Provider>
  );
};
export default MultiStepForm;
