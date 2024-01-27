import { useContext, useEffect, useState } from "react";
import MultiStepFormContext from "@/provider/MultiStepForm";
import Image from "next/image";
import { Formik } from "formik";
import { Nav, Tab } from "react-bootstrap";
import randomColor from "randomcolor";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

const ColorPalette = () => {
  const initialColors = [
    '#9013FE',
    '#F8E71C',
    '#417505',
    '#4A90E2'
  ]
  // [
  //   { r: '241', g: '112', b: '19', a: '1' },
  //   { r: '45', g: '187', b: '83', a: '1' },
  //   { r: '12', g: '120', b: '241', a: '1' },
  //   { r: '255', g: '0', b: '0', a: '1' },
  // ];
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);
  const [colors, setColor] = useState(); //randomColor({count: 6})
  const [selectPalette, setSelectColorPalette] = useState();
  const [customColor, SetCustomColor] = useState(initialColors);
  // ["#EC4899","#67C9FA","#2DD4BF","#D0996E",]

  const [displayColorPicker, setDisplayColorPicker] = useState(Array(initialColors.length).fill(false));
  const [selectedColorIndex, setSelectedColorIndex] = useState(null);

    const handleClick = (index) => {
    setDisplayColorPicker((prevDisplay) =>
      prevDisplay.map((item, i) => (i === index ? !item : item))
    );
    setSelectedColorIndex(index);
  };

  const handleClose = () => {
    setDisplayColorPicker(Array(initialColors.length).fill(false));
    setSelectedColorIndex(null);
  };

  const handleChange = (newColor) => {
    console.log(newColor.hex);
    const updatedColors = [...customColor];
    updatedColors[selectedColorIndex] = newColor.hex;
    SetCustomColor(updatedColors);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      selectedColorPaletteOption: "1",
      colorPaletteCustomOption: updatedColors,
    }));
    //console.log(Industrydetails);
  };

  const renderColorSwatch = (index) => {
    const styles = reactCSS({
      'default': {
        color: {
          width: '250px',
          height: '50px',
          borderRadius: '2px',
          background: `${customColor[index]}`,
          margin: '5px',
        },
        swatch: {
          padding: '0px',
          background: '#fff',
          borderRadius: '0px',
          boxShadow: '0 0 0 0px rgba(0,0,0,.1)',
          display: 'block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div key={index} style={styles.swatch} onClick={() => handleClick(index)}>
        <div style={styles.color} />
        {displayColorPicker[index] ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={handleClose} />
            <SketchPicker color={customColor[selectedColorIndex] || {}} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    );
  };
  
  const generateColors = async () => {
    var color = randomColor({
      luminosity: 'dark',
      count: 6,
    });
    let finalColors = [];
    //try{
      if (color) {
        //console.log(color.length,'colors-items');
        color.forEach((maincolor, index) => {
          var hueColors = randomColor({
            count: 4,
            hue: maincolor,
            //luminosity: 'random'
          });
          finalColors.push(hueColors);
        });
      }
    // } catch (error) {
    //   //generateColors();
    //   //console.error("Error generating color palettes:", error);
    //   // Handle error (e.g., show a user-friendly message)
    // }
    //console.log(finalColor);
    setColor(finalColors);
  };
  useEffect(() => {
    //console.log(randomColor({count: 6,}));
    //setColor(randomColor({count: 6,}));
    generateColors();
  },[]);

  const handleSelectColorPalette = (index: any, e: any, huecolor: any) => {
    // e.preventDefault();
    setSelectColorPalette(index);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      selectedColorPaletteOption: "0",
      selectedColorPalatte: huecolor,
    }));
    console.log(Industrydetails);
  };
  return (
    <div className="mainsection ">
      <div className="leftSection">
        <Image
          src="/images/left-img.svg"
          alt="leftsideimage"
          width={500}
          height={510}
        />
      </div>
      <div className="rightSection ">
        <div className="title-dashboard">
          Choose the <span className="style-title"> Color palette</span>
        </div>
        <div className="colors-generate-form">
          <Formik
            enableReinitialize={true}
            initialValues={Industrydetails}
            // validationSchema={validationSchema}
            onSubmit={() => {}}
          >
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <Tab.Container defaultActiveKey="explore">
                  <div className="color-palette-tab">
                    <div>
                      <Nav variant="pills">
                        <Nav.Item>
                          <Nav.Link eventKey="explore">
                            {" "}
                            <Image
                              src="/images/search-refraction.svg"
                              alt="search-refraction"
                              height={24}
                              width={24}
                            />
                            Create a explore Palette
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                    <div>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="custom">
                            <Image
                              src="/images/colors-icon.svg"
                              alt="colors-icon"
                              height={24}
                              width={24}
                            />{" "}
                            Create a custom Palette
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </div>
                  </div>
                  <div className="color-tab-content">
                    <Tab.Content>
                      <Tab.Pane eventKey="explore">
                        <div className="color-row">
                          {colors &&
                            colors?.map((maincolor: any, index: any) => {
                              // let huecolor = randomColor({
                              //   count: 4,
                              //   hue: maincolor,
                              // });
                              //console.log("huecolor", maincolor);

                              return (
                                <div
                                  key={maincolor}
                                  className={`color-column ${
                                    selectPalette === index ? "selected" : ""
                                  }`}
                                  onClick={(e) =>
                                    handleSelectColorPalette(
                                      index,
                                      e,
                                      maincolor
                                    )
                                  }
                                >
                                  {Array.isArray(maincolor) &&
                                    maincolor?.map((color: any) => (
                                      <div
                                        key={color}
                                        style={{
                                          background: color,
                                          width: 66,
                                          height: 66,
                                        }}
                                      ></div>
                                    ))}
                                </div>
                              );
                            })}
                        </div>
                        <div className="explore-btn-wrap">
                          <button
                            className="btn"
                            onClick={() => {
                              //setColor(randomColor({count: 6,}));
                              setSelectColorPalette();
                              generateColors();
                            }}
                          >
                            Explore More{" "}
                            <Image
                              className="ms-1"
                              src={"/images/right-arrow-icon.svg"}
                              alt="right-arrow"
                              width={14}
                              height={14}
                            />
                          </button>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                    <Tab.Content>
                      <Tab.Pane eventKey="custom">
                        <div className="custom-color-main">
                          <div>
                            {customColor.map((_, index) =>
                              renderColorSwatch(index)
                            )}
                          </div>
                        </div>
                        {/*<div className="custom-color-main">
                        {customColor?.map((customColor) => {
                          return (
                            <div
                            className="custom-color-box"
                              style={{
                                background: customColor,
                              }}
                            ></div>
                          );
                        })}
                        </div>*/}
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Tab.Container>
                <div className="btnwrapper align-self-end ">
                  <button
                    className="btnprev btn"
                    onClick={() => {
                      prev(4);
                    }}
                  >
                    <a>Back</a>
                  </button>
                  <button
                    className="btnnext btn"
                    onClick={() => {
                      prev(6);
                    }}
                  >
                    <a>Next</a>
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default ColorPalette;
