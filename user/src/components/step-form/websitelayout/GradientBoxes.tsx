import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import s from "../multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
import { Field } from "formik";
import { FaCheck } from "react-icons/fa";

interface ColorDetails {
  colorForPage: string;
  PageName: string;
  PageId: string;
  pct: number;
}

//  interpolateColor function for get the rgb color.
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
function interpolateColorForPage(
  pageName: any,
  color1: any,
  color2: any,
  percentage: any
) {
  // Add conditions for different pages
  switch (pageName) {
    case "Home":
      // Example: Different logic for "Home" page
      return interpolateColor(color1, color2, Math.abs(percentage - 100) / 100);
    case "About Us":
      // Example: Different logic for "About Us" page
      // You can add custom logic for other pages as well
      return interpolateColor(color1, color2, percentage / 100);
    default:
      // Default logic for other pages
      return interpolateColor(color1, color2, percentage / 100);
  }
}
const GradientBoxes = ({
  primaryColor,
  secondaryColor,
  pageName,
  pageId,
  values,
  setFieldValue,
}: any) => {
  const [gradientColors, setGradientColors] = useState<any>([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const { layoutDetails, setLayoutdetails }: any =
    useContext(MultiStepFormContext);

  useEffect(() => {
    const colors: ColorDetails[] = [];
    const numColors: number = 3;
    const rotationIncrement = 360 / numColors;
    for (let i = 0; i < numColors; i++) {
      const percentage = (i + 1) * (100 / numColors);
      const rotation = i * rotationIncrement;
      // Customize the color generation based on the pageName, percentage, and direction
      const { color, percentage: pct } = interpolateColorForPage(
        pageName,
        primaryColor,
        secondaryColor,
        percentage
      );

      colors.push({
        colorForPage: color,
        PageName: pageName,
        PageId: pageId,
        pct,
      });
    }

    setGradientColors(colors);
  }, [primaryColor, secondaryColor, pageName ]);

  // click event for the select the boxes data
  const handleColorClick = (
    colordetails: any,
    color: any,
    pageId: any,
    pageName: any,
    pct: any
  ) => {
    setLayoutdetails((prevLayoutDetails: any) => {
      const updatedSelectedLayouts = prevLayoutDetails.selectedLayouts.filter(
        (layout: any) => layout.pageName !== pageName
      );

      setFieldValue("selectedLayouts", [
        ...updatedSelectedLayouts,
        { colordetails, color, pageId, pageName, pct },
      ]);
      return {
        ...prevLayoutDetails,
        selectedLayouts: [
          ...updatedSelectedLayouts,
          { colordetails, color, pageId, pageName, pct },
        ],
      };
    });
  };

  return (
    <>
      <div className={s.layoutbg}>
        {gradientColors.map((colordetails: any, index: number) => {
          return (
            <>
              <div key={colordetails?.PageId} className={s.pagestemp}>
                <Field
                  type="radio"
                  id={`myRadio-${colordetails?.PageId}`}
                  name={`selectedLayouts-${colordetails?.PageName}`}
                  // value={colordetails?.PageId}
                  checked={
                    !!layoutDetails?.selectedLayouts?.find(
                      (layout: any) =>
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
                      getPageGradientStyle(
                        pageName,
                        primaryColor,
                        secondaryColor,
                        colordetails?.colorForPage
                      ),
                      colordetails?.colorForPage,
                      colordetails?.PageId,
                      colordetails?.PageName,
                      colordetails?.pct
                    )
                  }
                >
                  <div key={index}></div>
                  <span className={s.checkmark}>
                    <FaCheck />
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
      return `linear-gradient(45deg , ${primaryColor}, ${color}, ${secondaryColor})`;
  }
}

export default GradientBoxes;
