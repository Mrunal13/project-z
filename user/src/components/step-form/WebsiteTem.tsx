import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
// import { ChromePicker } from "react-color";
// Import the color picker component
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { BlockPicker, SketchPicker } from "react-color";
import Select from "react-select";

const WebsiteTemp = () => {
  const { next, prev, PageOption, layoutDetails, setLayoutdetails }: any =
    useContext(MultiStepFormContext);
  console.log("layoutDetails1", layoutDetails);

  const [selectedPageOptions, setSelectedPageOptions] = useState(
    layoutDetails?.selectedPages
  );

  const [sketchPickerColor1, setSketchPickerColor1] = useState("#37d67a");
  const [sketchPickerColor2, setSketchPickerColor2] = useState("#ff8a65");
  // destructuring rgba from state
  // const { r, g, b, a } = sketchPickerColor;
  // const [blockPickerColor1, setBlockPickerColor1] = useState("#37d67a");
  // const [blockPickerColor2, setBlockPickerColor2] = useState("#ff8a65");

  // useEffect(() => {
  //   setSelectedPageOptions(layoutDetails?.selectedPages);
  // }, [layoutDetails?.selectedPages.length]);
  // const handleSelectChange = (selected: any, setFieldValue: any) => {
  //   console.log("selected", selected);

  //   if (selected.length > 1) {
  //     selected.map((newValue: any) => {
  //       setFieldValue("selectedPages", [...newValue, newValue.value]);
  //     });
  //   } else {
  //     setFieldValue("selectedPages", [selected[0].value]);
  //   }
  // };
  // const handleColorChange = (color: any, index: any, setFieldValue: any) => {
  //   // Handle color change and update the form values
  //   // Update the color at the current index
  //   setFieldValue(`colorCodes[${currentColorIndex}]`, color.hex);
  // };

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
          onSubmit={(values) => {
            setLayoutdetails({
              ...layoutDetails,
              selectedPages: selectedPageOptions,
            });
            console.log("values", values);

            // next();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={s.formwrapper}>
              <div className="form-group">
                <label>Select Page Option</label>
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
              </div>
              <div className="row">
                <div className="blockpicker col-md-6 col-sm-12">
                  {/* <label>Choose Color Codes For the Webs:</label> */}
                  <label>Select Webiste primary Color</label>
                  {/* Div to display the color  */}
                  <div className="sketchpicker">
                    {/* Div to display the color  */}
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
                      }}
                    />
                  </div>
                </div>
                <div className="blockpicker col-md-6 col-sm-12">
                  {/* <label>Choose Color Codes For the Webs:</label> */}
                  <label>Select Webiste primary Color</label>
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
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={s.btnwrapper}>
                <button className={`${s.btnprev} mt-4`} onClick={prev}>
                  Back
                </button>
                <button
                  className={`${s.btnnext} mt-4`}
                  type="submit"
                  // onClick={next}
                >
                  Next
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
