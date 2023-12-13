import React, { useContext, useEffect, useState } from "react";
import s from "../multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
import { Field } from "formik";

// Updated interpolateColor function
function interpolateColor(color1: any, color2: any, percentage: any) {
  const hex = (color: any) => {
    const str = color.replace(/^#/, "");
    const bigint = parseInt(str, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  const rgb1 = hex(color1);
  const rgb2 = hex(color2);

  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * percentage);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * percentage);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * percentage);

  return { color: `rgb(${r},${g},${b})`, percentage: percentage };
}
const GradientBoxes = ({
  primaryColor,
  secondaryColor,
  pageName,
  pageId,
  values,
}: any) => {
  const [gradientColors, setGradientColors] = useState([]);

  const [selectedColor, setSelectedColor] = useState(null);
  const { layoutDetails, setLayoutdetails }: any =
    useContext(MultiStepFormContext);

  useEffect(() => {
    const colors: any = [];
    for (let i = 0; i < 5; i++) {
      const percentage = (i + 1) * 20; // Red and Blue have different random percentages

      // Customize the color generation based on the pageName, percentage, and direction
      let colorForPage = "";
      let PageName = "";
      let PageId = "";
      let pct;

      if (pageName === "Home") {
        // Example: Bottom to Top
        const value = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
        colorForPage = value.color;
        pct = value.percentage;
        PageName = pageName;
        PageId = pageId;
      } else if (pageName === "About Us") {
        // Example: Left to Right
        const value = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
        colorForPage = value.color;
        pct = value.percentage;
        PageName = pageName;
        PageId = pageId;
      } else {
        const value = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
        colorForPage = value.color;
        pct = value.percentage;
        PageName = pageName;
        PageId = pageId;
      }

      // Add more conditions for other pages...

      colors.push({ colorForPage, PageName, PageId, pct });
    }

    setGradientColors(colors);
  }, [primaryColor, secondaryColor, pageName]);

  const handleColorClick = (
    color: any,
    pageId: any,
    pageName: any,
    pct: any
  ) => {
    setLayoutdetails((prevLayoutDetails: any) => {
      const updatedSelectedLayouts = prevLayoutDetails.selectedLayouts.filter(
        (layout: any) => layout.pageName !== pageName
      );

      return {
        ...prevLayoutDetails,
        selectedLayouts: [
          ...updatedSelectedLayouts,
          { color, pageId, pageName, pct },
        ],
      };
    });
  };

  return (
    <>
      <div className={`cont-bg`}>
        {gradientColors.map((colordetails: any, index) => {
          return (
            <>
              <div key={colordetails?.PageId} className="cont-checkbox">
                <Field
                  type="radio"
                  id={`myRadio-${colordetails?.PageId}`}
                  name={`selectedLayouts-${colordetails?.PageName}`}
                  // value={colordetails?.PageId}
                  checked={
                    !!layoutDetails?.selectedLayouts?.find(
                      (layout:any) =>
                        layout.color === colordetails?.colorForPage &&
                        layout.pageName === colordetails.PageName
                    )
                  }
                />
                <label
                  htmlFor={`myRadio-${colordetails?.PageId}`}
                  className={s.boxes}
                  style={{
                    background: getPageGradientStyle(
                      pageName,
                      primaryColor,
                      secondaryColor,
                      colordetails?.colorForPage
                    ),
                  }}
                  onClick={(e: any) =>
                    handleColorClick(
                      colordetails?.colorForPage,
                      colordetails?.PageId,
                      colordetails?.PageName,
                      colordetails?.pct
                    )
                  }
                >
                  <div
                    key={index}
                    // style={{
                    //   background: getPageGradientStyle(
                    //     pageName,
                    //     primaryColor,
                    //     secondaryColor,
                    //     colordetails?.colorForPage
                    //   ),
                    // }}
                    // onClick={() =>
                    //   handleColorClick(
                    //     colordetails?.colorForPage,
                    //     colordetails?.PageId,
                    //     colordetails?.PageName
                    //   )
                    // }
                  ></div>
                  <span className="cover-checkbox">
                    <svg viewBox="0 0 12 10">
                      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                  </span>
                </label>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
// Helper function to determine the gradient style based on the pageName
function getPageGradientStyle(
  pageName: any,
  primaryColor: any,
  secondaryColor: any,
  color: any
) {
  switch (pageName) {
    case "Home":
      // Example: Bottom to Top
      return `linear-gradient(to top, ${primaryColor}, ${color}, ${secondaryColor})`;
    case "About Us":
      // Example: Left to Right
      return `radial-gradient(circle, ${primaryColor}, ${color}, ${secondaryColor})`;
    // Add more cases for other pages...
    default:
      return `linear-gradient(${primaryColor}, ${color}, ${secondaryColor})`;
  }
}

export default GradientBoxes;