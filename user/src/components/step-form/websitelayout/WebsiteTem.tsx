import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { ChromePicker } from "react-color";
// Import the color picker component
import s from "../multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { BlockPicker, SketchPicker } from "react-color";
import Select from "react-select";
import * as Yup from "yup";
import GradientBoxes from "./GradientBoxes";
import Image from "next/image";

const WebsiteTemp = () => {
  const {
    next,
    prev,
    PageOption,
    layoutDetails,
    setLayoutdetails,
    Layoutoption,
    Industrydetails,
  }: any = useContext(MultiStepFormContext);
  // const validationSchema = Yup.object().shape({
  //   selectedPages: Yup.array().min(1, "Select at least one page").required(),
  //   selectedLayouts: Yup.array().min(1, "Select a layout").required(),
  // });

  const [selectedPageOptions, setSelectedPageOptions] = useState(
    layoutDetails?.selectedPages
  );
  const [primaryColor, setPrimaryColor] = useState(
    layoutDetails?.colorCodes[0].primaryColor
  );
  const [secondaryColor, setSecondaryColor] = useState(
    layoutDetails?.colorCodes[0].secondaryColor
  );
  const [gradientColors, setGradientColors] = useState([]);

  // const handleLayoutChange = (e: any, setFieldValue: any, values: any) => {
  //   const layoutId = e.target.value;

  //   // Update the selected layout in state
  //   setFieldValue("selectedLayouts", [layoutId]);

  //   // Update layout details
  //   setLayoutdetails({
  //     ...layoutDetails,
  //     selectedLayouts: [layoutId],
  //   });
  // };

  const handlesubmitlayout = (values: any) => {
    setLayoutdetails({
      ...layoutDetails,
      colorCodes: [primaryColor, secondaryColor],
    });
    console.log("FinalvalueofLayoutPage", layoutDetails);
    next();
  };

  // select the pages of website
  const handleSelectChange = (selected: any, setFieldValue: any) => {
    // Get the array of previously selected pages
    const prevSelectedPages = selectedPageOptions;

    // Update the state with the newly selected pages
    setSelectedPageOptions(selected);

    // Remove layouts associated with pages that are no longer selected
    const updatedSelectedLayouts = layoutDetails.selectedLayouts.filter(
      (layout: any) => selected.some((page: any) => page.id === layout.pageId)
    );

    // Update layout details
    setLayoutdetails((prevLayoutDetails: any) => ({
      ...prevLayoutDetails,
      selectedPages: selected || [],
      selectedLayouts: updatedSelectedLayouts,
    }));

    // Update the Formik field value
    setFieldValue("selectedPages", selected || []);
  };

  // handle Secondary Color event
  const handleSecondaryColor = (color: any) => {
    setSecondaryColor(color.hex);
    setLayoutdetails({
      ...layoutDetails,
      colorCodes: [
        {
          primaryColor: primaryColor,
          secondaryColor: color.hex,
        },
      ],
      selectedLayouts: [],
    });
  };
  //  handle primary Color event
  const handlePrimaryColor = (color: any) => {
    setPrimaryColor(color.hex);
    setLayoutdetails({
      ...layoutDetails,
      colorCodes: [
        {
          primarycolor: color.hex,
          secondaryColor: secondaryColor,
        },
      ],
      selectedLayouts: [],
    });
  };
  return (
    <div className={s.stepswrapper}>
      <div className={s.maincard}>
        <div className={s.heading}>Website Layout</div>
        <Formik
          initialValues={layoutDetails}
          onSubmit={handlesubmitlayout}
          // validationSchema={validationSchema}
        >
          {({ setFieldValue, values, handleChange }) => (
            <Form className={s.formwrapper}>
              <div className="form-group">
                <label>Select Page </label>
                <Select
                  isMulti
                  isClearable
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={PageOption}
                  name="selectedPages"
                  value={selectedPageOptions?.map((value: any) => ({
                    value: value.value,
                    label: value.value,
                    id: value.id,
                  }))}
                  onChange={(selected) => {
                    handleSelectChange(selected, setFieldValue);
                  }}
                />
                <ErrorMessage
                  name="selectedPages"
                  component="div"
                  className={s.error}
                />
              </div>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  {/* <label>Choose Color Codes For the Webs:</label> */}
                  <label>Select Webiste Primary Color</label>
                  <div className="sketchpicker">
                    <div
                      style={{
                        backgroundColor: `${primaryColor}`,
                        width: 100,
                        height: 50,
                        border: "2px solid white",
                      }}
                    ></div>
                    {/* Sketch Picker from react-color and handling color on onChange event ||  for the primary color */}
                    <SketchPicker
                      disableAlpha={false}
                      color={primaryColor}
                      onChange={(color) => handlePrimaryColor(color)}
                    />
                  </div>
                </div>
                <div className="blockpicker col-md-6 col-sm-12">
                  {/* <label>Choose Color Codes For the Webs:</label> */}
                  <label>Select Webiste Secondary Color</label>
                  {/* Div to display the color  */}
                  <div className="sketchpicker">
                    {/* Div to display the color  */}
                    <div
                      style={{
                        backgroundColor: `${secondaryColor}`,
                        width: 100,
                        height: 50,
                        border: "2px solid white",
                      }}
                    ></div>
                    {/* Sketch Picker from react-color and handling color on onChange event  || for secondary color */}
                    <SketchPicker
                      color={secondaryColor}
                      onChange={handleSecondaryColor}
                    />
                  </div>
                </div>
              </div>

              {layoutDetails?.selectedPages &&
                layoutDetails?.selectedPages.map(
                  (pagename: any, index: number) => {
                    return (
                      <React.Fragment key={index}>
                        <h5 className="mt-5">{pagename.label}</h5>
                        <GradientBoxes
                          key={pagename.label}
                          primaryColor={primaryColor}
                          secondaryColor={secondaryColor}
                          pageName={pagename.value}
                          pageId={pagename.id}
                          values={values}
                          setFieldValue={setFieldValue}
                          // onColorSelect={(color, id) =>
                          //   handleColorSelect(color, id)
                          // }
                        />
                      </React.Fragment>
                    );
                  }
                )}

              <div className={s.btnwrapper}>
                <button className={`${s.btnprev} mt-4`} onClick={prev}>
                  Back
                </button>
                <button className={`${s.btnnext} mt-4`} type="submit">
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WebsiteTemp;
