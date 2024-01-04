import React from "react";

const Listing = ({
  data,
  BrandNameselect,
  Name,
  values,
  handleChange,
}: any) => {
  return (
    <>
      <div className="title-dashboard mt-4 text-center">
        Best Name <span className="style-title "> suggestions</span>
      </div>
      <div className="brandName-List-wrapper">
        {data &&
          data?.map((list: any, index: any) => (
            <React.Fragment key={index}>
              <input
                type="hidden"
                name="selectedBrandName"
                value={values.brandName}
                onChange={handleChange}
              />
              <div
                key={index}
                className="list"
                onClick={() => BrandNameselect(list)}
                style={{
                  background: Name == list.title ? "#EBEBEB" : "",
                  borderRadius: Name == list.title ? "6px" : "",
                }}
              >
                <h5 className="list-title">{list.title}</h5>
                <p className="description">{list.description}</p>
              </div>
            </React.Fragment>
          ))}
      </div>
    </>
  );
};
export default Listing;
