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

const WebsiteTemp = () => {
  const {
    next,
    prev,
    PageOption,
    layoutDetails,
    setLayoutdetails,
    Layoutoption,
  }: any = useContext(MultiStepFormContext);
  console.log("layoutDetails1", layoutDetails);
  const validationSchema = Yup.object().shape({
    selectedPages: Yup.array().min(1, "Select at least one page").required(),
    selectedLayouts: Yup.array().min(1, "Select a layout").required(),
  });

  const [selectedPageOptions, setSelectedPageOptions] = useState(
    layoutDetails?.selectedPages
  );
  const [sketchPickerColor1, setSketchPickerColor1] = useState(
    layoutDetails?.colorCodes[0] || "#37d67a"
  );
  const [sketchPickerColor2, setSketchPickerColor2] = useState(
    layoutDetails?.colorCodes[1] || "#ff8a65"
  );
  const [gradientColors, setGradientColors] = useState([]);

  const handleLayoutChange = (e: any, setFieldValue: any, values: any) => {
    const layoutId = e.target.value;

    // Update the selected layout in state
    setFieldValue("selectedLayouts", [layoutId]);

    // Update layout details
    setLayoutdetails({
      ...layoutDetails,
      selectedLayouts: [layoutId],
    });
  };
  const handlesubmitlayout = (values: any) => {
    console.log("values", values);
    setLayoutdetails({
      ...layoutDetails,
    });

    next();
  };
  const handleSelectChange = (selected: any, setFieldValue: any) => {
    const selectedValues = selected
      ? selected.map((option: any) => option.value)
      : [];
    setSelectedPageOptions(selectedValues);
    setLayoutdetails({ ...layoutDetails, selectedPages: selectedValues });
    setFieldValue("selectedPages", selectedValues);
  };
  return (
    <div className={s.stepswrapper}>
      <div className={s.maincard}>
        <div className={s.heading}>Website Layout</div>
        <Formik
          initialValues={layoutDetails}
          onSubmit={handlesubmitlayout}
          validationSchema={validationSchema}
        >
          {({ setFieldValue, values, handleChange }) => (
            <Form>
              <div className="form-group">
                <label>Select Page </label>
                <Select
                  key={JSON.stringify(PageOption)}
                  isMulti
                  isClearable
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={PageOption}
                  name="selectedPages"
                  value={selectedPageOptions?.map((value: any) => ({
                    value,
                    label: value,
                  }))}
                  onChange={(selected) =>
                    handleSelectChange(selected, setFieldValue)
                  }
                />
                <ErrorMessage
                  name="selectedPages"
                  component="div"
                  className={s.error}
                />
              </div>
              <div className="row">
                <div className="blockpicker col-md-6 col-sm-12">
                  {/* <label>Choose Color Codes For the Webs:</label> */}
                  <label>Select Webiste Primary Color</label>
                  <div className="sketchpicker">
                    <div
                      style={{
                        backgroundColor: `${sketchPickerColor1}`,
                        width: 100,
                        height: 50,
                        border: "2px solid white",
                      }}
                    ></div>
                    {/* Sketch Picker from react-color and handling color on onChange event */}
                    <SketchPicker
                      color={sketchPickerColor1}
                      onChange={(color) => {
                        setSketchPickerColor1(color.hex);
                        setLayoutdetails({
                          ...layoutDetails,
                          colorCodes: [sketchPickerColor1, sketchPickerColor2],
                        });
                      }}
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
                        backgroundColor: `${sketchPickerColor2}`,
                        width: 100,
                        height: 50,
                        border: "2px solid white",
                      }}
                    ></div>
                    {/* Sketch Picker from react-color and handling color on onChange event */}
                    <SketchPicker
                      color={sketchPickerColor2}
                      onChange={(color) => {
                        setSketchPickerColor2(color.hex);
                        setLayoutdetails({
                          ...layoutDetails,
                          colorCodes: [sketchPickerColor1, sketchPickerColor2],
                        });
                      }}
                    />
                  </div>
                </div>
              </div>

              {layoutDetails?.selectedPages &&
                layoutDetails?.selectedPages.map((pagename: any) => {
                  return (
                    <>
                      <h5 className="mt-5">{pagename}</h5>
                      <GradientBoxes
                        key={pagename}
                        primaryColor={sketchPickerColor1}
                        secondaryColor={sketchPickerColor2}
                        pageName={pagename}
                      />
                    </>
                  );
                })}

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
