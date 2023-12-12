import React, { useEffect, useState } from "react";
import s from "../multiplestep.module.css";

// Updated interpolateColor function
function interpolateColor(color1: any, color2: any, percentage: any) {
  console.log("percentage", percentage);

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

  return `rgb(${r},${g},${b})`;
}
const GradientBoxes = ({ primaryColor, secondaryColor, pageName }: any) => {
  const [gradientColors, setGradientColors] = useState([]);
  console.log("gradientColors", gradientColors);

  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    const colors = [];
    for (let i = 0; i < 5; i++) {
      const percentage = (i + 1) * 20; // Red and Blue have different random percentages
      console.log("percentage", percentage);

      // Customize the color generation based on the pageName, percentage, and direction
      let colorForPage = "";

      if (pageName === "Home") {
        // Example: Bottom to Top
        colorForPage = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
      } else if (pageName === "About Us") {
        // Example: Left to Right
        colorForPage = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
      } else {
        colorForPage = interpolateColor(
          primaryColor,
          secondaryColor,
          percentage / 100
        );
      }

      // Add more conditions for other pages...

      colors.push(colorForPage);
    }
    setGradientColors(colors);
  }, [primaryColor, secondaryColor, pageName]);

  const handleColorClick = (color: any) => {
    console.log("color", color);

    // Handle the click event and show details for the selected color
    setSelectedColor(color);
    // You can add your logic to display details here
  };

  return (
    <div className={s.layoutwrapper}>
      {gradientColors.map((color, index) => {
        return (
          <div
            key={index}
            className={s.boxes}
            style={{
              background: getPageGradientStyle(
                pageName,
                primaryColor,
                secondaryColor,
                color
              ),
            }}
            onClick={() => handleColorClick(color)}
          ></div>
        );
      })}
    </div>
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
