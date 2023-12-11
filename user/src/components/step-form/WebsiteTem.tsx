import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
// import { ChromePicker } from "react-color";
// Import the color picker component
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { BlockPicker, SketchPicker } from "react-color";
import Select from "react-select";
import * as Yup from "yup";
import Image from "next/image";

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
    setLayoutdetails({
      ...layoutDetails,
    });
    console.log("values", values);

    // next();
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
              {selectedPageOptions.length > 0 &&
                sketchPickerColor1 &&
                sketchPickerColor2 && (
                  <>
                    <label htmlFor="" className="mt-5">
                      {" "}
                      Select Webiste Layout
                    </label>
                    {/* <img src="/images/layout-one.webp" alt="" /> */}
                    <div className="cont-bg">
                      {/* <div className="cont-title">Checkbox</div> */}
                      <div className="cont-main">
                        {Layoutoption?.map((layout: any) => (
                          <div key={layout.id} className="cont-checkbox">
                            <Field
                              type="radio"
                              id={`myRadio-${layout.id}`}
                              name="selectedLayouts"
                              checked={values.selectedLayouts[0] === layout.id}
                              value={layout.id}
                              onChange={(e: any) =>
                                handleLayoutChange(e, setFieldValue, values)
                              }
                            />
                            <label htmlFor={`myRadio-${layout.id}`}>
                              <Image
                                src={layout.images}
                                alt={`Layout ${layout.name}`}
                                width={100}
                                height={100}
                              />
                              <span className="cover-checkbox">
                                <svg viewBox="0 0 12 10">
                                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                </svg>
                              </span>
                              <div className="info">{layout.name}</div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <ErrorMessage
                      name="selectedLayouts"
                      component="div"
                      className={s.error}
                    />
                  </>
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
