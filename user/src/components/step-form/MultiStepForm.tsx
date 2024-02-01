import React, { useEffect, useState } from "react";
import { Provider } from "@/provider/MultiStepForm";
import Industry from "./Industry";
import BrandName from "./BrandName";
import UploadLogo from "./upload-logo/Uploadlogo";
import Domain from "./Domain/Domain";
import WebsiteTemp from "./websitelayout/WebsiteTem";
import Logo from "../layout/logo";
import PopUp from "./upload-logo/Uploadlogo";
import GenerateLogo from "./upload-logo/GenerateLogo";
import GenerateBrandName from "./Domain/GenerateDomainName";
import GenerateDomainName from "./Domain/GenerateDomainName";
import PagesListing from "./website-pages/PagesListing";
import ColorPalette from "./color-palette";
import PersonalDetails from "./personal-details";
import GrapesJSEditor from "./personal-details/test";

const IndustrydetailsInitialState = {
  id: "",
  userId: "",
  status: "0/1",
  createdAt: "",
  updatedAt: "",
  industryCategory: "",
  industry: "",
  business: "",
  hasBrandName: "no",
  brandName: "",
  brandNameSearchtext: "",
  brandNameSearchResults: [],
  hasBrandLogo: "",
  brandLogoIcon: "",
  brandLogoImportUrl: "url",
  brandLogoSearchOptions: [], //array of search results
  hasDomain: "no",
  domainName: "",
  domainNameSearchtext: "",
  domainNameSearchResults: [],
  selectedPages: [], //array of selected pages
  selectedColorPaletteOption: "0=explore 1=custom",
  colorPaletteExploreOption: [], //array of default previewed colors
  colorPaletteCustomOption: [], //custom color palette option
  selectedColorPalatte: [], //array of selected colors
  templateOptions: [], //array of templates provided for selection
  selectedTemplate: {}, // selected template
  selectedTemplates: [], // selected templates
  user: {
    email: "",
    phoneNumber: "",
    address: {
      address: "",
      city: "",
      country: "",
      zipCode: "",
    },
  },
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
  //console.log("Industrydetails", Industrydetails);

  const [logo, setLogo] = useState(logodetails);
  const [category, SetCategory] = useState<CategoryItem[]>([]);
  const [mutate, setMutate] = useState(false);
  const [domain, setdomain] = useState(Domaindetails);
  const [layoutDetails, setLayoutdetails] = useState(WebsiteLayoutDetails);
  const [currentStep, setCurrentStep] = useState(0);
  const [isopenPopUp, SetOpenPopUp] = useState("");

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
          .map((subcategory: any) => (
          {
            value: subcategory.subCategory,
            label: subcategory.subCategory,
            group: subcategory.category,
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
  const next = (currentStep: any) => {
    // if (currentStep === 4) {
    //   setCurrentStep(0);
    //   setIndustryDetails(IndustrydetailsInitialState);
    //   setLogo(logodetails);
    //   setdomain(Domaindetails);
    //   // setLayoutdetails(WebsiteLayoutDetails);
    //   return;
    // }
    setCurrentStep(currentStep);
  };
  // move to prev step form
  const prev = (currentStep: any) => setCurrentStep(currentStep);

  const renderStep = (step: any) => {
    switch (step) {
      case 0:
        return (
          <>
            {category && (
              <>
                <Logo />
                <GenerateLogo />
                {/* <Industry /> */}
                {/* <GrapesJSEditor /> */}
              </>
            )}
          </>
        );
      case 1:
        //if (Industrydetails?.hasBrandName == "no") {
          return (
            <>
              <Logo showDefault={false} />
              <BrandName />
            </>
          );
        //}
      case 2:
        return (
          <>
            <Logo showDefault={false} />
            <UploadLogo />
          </>
        );
      case 3:
        return (
          <>
            <Logo showDefault={false} />
            <GenerateLogo />
          </>
        );
      // case 4:
      //   return (
      //     <>
      //       <Logo showDefault={false} />
      //       <Domain />
      //     </>
      //   );
      // case 5:
      //   return (
      //     <>
      //       <Logo showDefault={false} />
      //       <GenerateDomainName />
      //     </>
      //   );
      case 4:
        return (
          <>
            <Logo showDefault={false} />
            <PagesListing />
          </>
        );
      case 5:
        return (
          <>
            <Logo />
            <ColorPalette />
          </>
        );
      case 6:
        return (
          <>
            <Logo />
            <PersonalDetails />
          </>
        );
      case 7:
        return (
          <>
            <Logo showDefault={false} />
            <WebsiteTemp />
          </>
        );
      default:
        <>
          <Logo showDefault={false} />
           
        </>;
        // return null;
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
        SetOpenPopUp,
      }}
    >
      <main>{renderStep(currentStep)}</main>
    </Provider>
  );
};
export default MultiStepForm;
