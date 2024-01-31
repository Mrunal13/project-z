import React, { useContext, useEffect, useState } from "react";
import { getBase64Font, getFontURL } from "../../../features/fonts/fonts";

function Text(props) {
  const textId = `text_${props.fontSelection}`;
  return (
    <text
      id={textId}
      x={(props.size.x * (50 + props.offset.x)) / 100}
      y={(props.size.y * (50 + props.offset.y)) / 100}
      textAnchor="middle"
      alignmentBaseline="middle"
      fill={`url(#gradient_${props.fontSelection})`}
    >
      {props.text}
    </text>
  );
}

const SvgLogo = (props) => {
    //console.log(props);
    const logoText = props.logoText?? "Skyward Digital";
    const fontSize = Math.min(200 / (logoText.length * 0.6), 16);
    const fontSelection =
      props.fontSelection ?? Math.floor(Math.random() * (1595 - 0 + 1)) + 0;
    const [fontURL, setFontURL] = useState("");
    const [defaultProperty, setDefaultProperty] = useState({
      text: logoText,
      size: { x: 200, y: 100 },
      font: {
        familyIdx: 0,
        variantIdx: 0,
        size: 20,
      },
      textColor: {
        color1: "#FFFFFF",
        color2: "#CCCCCC",
        angle: 50,
        width: 100,
      },
      textOffset: { x: 0, y: 0 },
      bgColor: {
        color1: "#FFFFFF",
        color2: "#FFFFFF",
        angle: 45,
        width: 50,
      },
      bgOpacity: 100,
    });
    //console.log(fontSize);
    
    useEffect(() => {
        const logoColor1 =
          props.logoColor1 ?? Math.floor(Math.random() * 16777215).toString(16);
        const logoColor2 =
          props.logoColor2 ?? Math.floor(Math.random() * 16777215).toString(16);
        setDefaultProperty({
          text: logoText,
          size: { x: 200, y: 100 },
          font: {
            familyIdx: 0,
            variantIdx: 0,
            size: fontSize,
          },
          textColor: {
            color1: "#" + "0".repeat(6 - logoColor1.length) + logoColor1,
            color2: "#" + "0".repeat(6 - logoColor2.length) + logoColor2,
            angle: 50,
            width: 100,
          },
          textOffset: { x: 0, y: 0 },
          bgColor: {
            color1: "#FFFFFF",
            color2: "#FFFFFF",
            angle: 45,
            width: 50,
          },
          bgOpacity: 100,
        });
        //const defaultProperty: LogoProperty = ;
      async function getFont() {
        //const fontSelection = fontSelection;
        const url = getFontURL(fontSelection, defaultProperty.font.variantIdx);
        const loaded = await getBase64Font(url);
        setFontURL(loaded.base64);
      }
      getFont();
    }, []);

    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${defaultProperty.size.x} ${defaultProperty.size.y}`}
          width="100%"
          height="100%"
          id="svg-logo"
          data-count={props.count ?? 0}
          //ref={props.count ?? 0}
        >
            <g class="iconsvg-imagesvg" transform="translate(0,0)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 144"><path d="M4.14 96.07l100-38.21v-21L59.21 21.08 4.5 46.9a.19.19 0 0 1 0 .07L.86 60.85A73.16 73.16 0 0 0 0 72a71.89 71.89 0 0 0 4.14 24.07z" fill="#fff"/><path d="M91.35 48.87a5.18 5.18 0 0 1 1.1.5c-1.49 1.49 3.19 2.68 1.47 3.81C86 58.35 83.43 64.79 83 74.32c-.19 5.08-1 10 .33 15 3.91 14.3 8 22.86 21.64 28.58 4.5 2 10.82 7.06 15.74 7.07A72 72 0 0 1 3.18 93.23a.78.78 0 0 0 0-.16c-.05-.12-.1-.24-.14-.36s-.07-.24-.1-.36a4.43 4.43 0 0 1 .19-2.69c6.43-14.06 15.4-25.91 28.74-33.83 9.91-5.9 20.72-8.6 32-9.3 9.24-.59 18.41.6 27.48 2.34z" fill="#706fb3"/><path d="M72 0a72 72 0 0 1 48.44 125.27 56.38 56.38 0 0 1-16.75-3.87 48.16 48.16 0 0 1-27.88-31.69c-1.34-5-1.19-10.11-1-15.19.41-9.52 4.49-16.82 12.41-22a15.7 15.7 0 0 1 1.79-1l.74-.36a9.55 9.55 0 0 0 2.7-1.79c.69-.19 1.76.38 2-.48s-.77-1.26-1.3-1.75a50.62 50.62 0 0 0-24.39-12.42 67.28 67.28 0 0 0-39.35 3.72A61.33 61.33 0 0 0 1.85 60.59c-.16.26-.36.48-.63.84a1.62 1.62 0 0 1-.36-.57c.1-.64.21-1.29.32-1.93A72 72 0 0 1 72 0z" fill="#22bae6"/></svg></g>
            <g transform="translate(66,3.852863311767578)">
          <defs>
            <linearGradient
              id={`gradient_${fontSelection}`}
              gradientUnits="userSpaceOnUse"
              //{...getSquareCornersInPercent(defaultProperty.textColor.angle)}
            >
              <stop
                stopColor={defaultProperty.textColor.color1}
                offset={`${50 - defaultProperty.textColor.width}%`}
              />
              <stop
                stopColor={defaultProperty.textColor.color2}
                offset={`${50 + defaultProperty.textColor.width}%`}
              />
            </linearGradient>
            <linearGradient
              id="bg-gradient"
              gradientUnits="userSpaceOnUse"
              //{...getSquareCornersInPercent(defaultProperty.bgColor.angle)}
            >
              {/* <stop
                //stopColor={property.bgColor.color1}
                stopColor="#ffffff"
                offset={`${50 - defaultProperty.bgColor.width}%`}
              />
              <stop
                //stopColor={property.bgColor.color2}
                stopColor="#ffffff"
                offset={`${50 + defaultProperty.bgColor.width}%`}
              /> */}
            </linearGradient>
          </defs>
          <style>
            {`@font-face {
                    font-family: "family_${fontSelection}";
                    src: ${fontURL};
                }
                text#text_${fontSelection} {
                    font: ${defaultProperty.font.size}pt family_${fontSelection};
                }
                `.replace(/ {2,}|[\n\r]/g, " ")}
          </style>
          <rect
            x={0}
            y={0}
            width="100%"
            height="100%"
            fill="url(#bg-gradient)"
            fillOpacity={defaultProperty.bgOpacity / 100}
          />
          <Text
            id={`text_${fontSelection}`}
            text={defaultProperty.text}
            size={defaultProperty.size}
            offset={defaultProperty.textOffset}
            // textLength="200"
            // lengthAdjust="spacingAndGlyphs"
            fontSelection={fontSelection}
          />
          </g>
        </svg>
      </>
    );
};
export default SvgLogo;