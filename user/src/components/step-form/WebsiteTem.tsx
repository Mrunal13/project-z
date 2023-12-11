import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
// import { ChromePicker } from "react-color";
// Import the color picker component
import s from "./multiplestep.module.css";
import MultiStepFormContext from "@/provider/MultiStepForm";
import { ChromePicker } from "react-color";
import Select from "react-select";

const WebsiteTemp = () => {
  const { next, prev, PageOption, layoutDetails, setLayoutdetails }: any =
    useContext(MultiStepFormContext);
  console.log("layoutDetails1", layoutDetails);

  const [selectedPageOptions, setSelectedPageOptions] = useState(
    layoutDetails?.selectedPages
  );
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(null);

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
  const handleColorChange = (color: any, index: any, setFieldValue: any) => {
    // Handle color change and update the form values
    // Update the color at the current index
    setFieldValue(`colorCodes[${currentColorIndex}]`, color.hex);
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
              {/* <div>
                <label>Choose Color Codes:</label>
                {layoutDetails?.colorCodes?.map((color: any, index: any) => (
                  <div key={index} className={s.colorPickerContainer}>
                    <div
                      className={s.colorBox}
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setCurrentColorIndex(index);
                        setColorPickerVisible(true);
                      }}
                    >
                      hello
                    </div>
                    {colorPickerVisible && currentColorIndex === index && (
                      <div className={s.colorPickerPopover}>
                        <div
                          className={s.colorPickerCover}
                          onClick={() => setColorPickerVisible(false)}
                        />
                        <ChromePicker
                          // color={color}
                          onChange={(color) =>
                            handleColorChange(color, index, setFieldValue)
                          }
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div> */}
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
