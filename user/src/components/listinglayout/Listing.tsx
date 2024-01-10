import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Button, Modal, OverlayTrigger, Popover } from "react-bootstrap";
import MultiStepFormContext from "@/provider/MultiStepForm";

const Listing = ({
  data,
  BrandNameselect,
  values,
  handleChange,
  setBrandName,
  selectedBrand,
  selectedDomain,
  setSelectedBrand,
  setSelectedDomain,
}: any) => {
  //console.log("data", data);
  const { next, prev, Industrydetails, setIndustryDetails }: any =
    useContext(MultiStepFormContext);
  const [currentPopover, setCurrentPopover] = useState(null);
  //console.log("currentPopover", currentPopover);
  const microUnitsToDollars = (microUnits) => (microUnits / 1000000).toFixed(2);

  const handleDomainSelect = (brandName: any, domain: any) => {
    setBrandName(brandName);
    setSelectedBrand(brandName);
    setSelectedDomain(domain);
    // setCurrentPopover(null);
    setIndustryDetails((prevdata: any) => ({
      ...prevdata,
      brandName: brandName,
      domainName: domain,
    }));

    // If needed, close the popover or perform any other actions here
    // setBrandName(""); // Reset the brand name state after selection
  };

  return (
    <>
      <div className="title-dashboard mt-4 text-center">
        Best Name <span className="style-title "> suggestions</span>
      </div>
      <div className="brandName-List-wrapper">
        {data.length ? (
          data?.map((list: any, index: any) => {
            const brandName = Object.keys(list)[0];
            const domains = list[brandName].domains;

            return (
              <OverlayTrigger
                key={index}
                container={this}
                trigger="click"
                rootClose={true}
                // trigger={["hover", "focus"]}
                placement="bottom"
                show={currentPopover === index}
                overlay={
                  <Popover
                    id="popover-basic"
                    arrowOffsetLeft={0}
                    arrowOffsetTop={0}
                    title="Popover bottom"
                    // show={currentPopover === index}
                    // rootClose={true} // Close popover when clicking outside
                    // onHide={() => setCurrentPopover(null)}
                  >
                    <div className="grid-class ps-4 pe-4">
                      {domains.map((domain: any, index: any) => (
                        <div
                          className={`listing-domain-wrapper ${domain.available ? 'active' : 'inactive'}`}
                          onClick={() =>{
                            const element = document.querySelector('.listing-domain-wrapper');
                            if (element && element.classList.contains('active')) {
                              handleDomainSelect(brandName, domain.domain)
                            }
                          }
                          }
                          style={{
                            background:
                              selectedDomain === domain.domain ? "#EBEBEB" : "",
                            borderRadius:
                              selectedDomain === domain.domain ? "6px" : "",
                          }}
                        >
                          <div className="domain_title">
                            {domain.available ? (
                              <Image
                                src={"/images/check-circle-broken.svg"}
                                alt="check-circle-broken"
                                height={20}
                                width={20}
                                className="green"
                                style={{ color: "green" }}
                              />
                            ) : (
                              <Image
                                src={"/images/slash-octagon.svg"}
                                alt="check-circle-broken"
                                height={20}
                                width={20}
                                className="red"
                                style={{ color: "green" }}
                              />
                            )}

                            <h6 key={domain.domain}>{domain.domain}</h6>
                          </div>
                          <div className="domain-desc">
                            <p>
                              {domain.price && <span>$ {microUnitsToDollars(domain.price)}</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Popover>
                }
                // onEnter={() => setCurrentPopover(index)} // Update the state when the popover is about to open
                // onExited={() => setCurrentPopover(null)}
              >
                <div
                  className="list"
                  onClick={() => {
                    BrandNameselect(list);
                    setCurrentPopover(index);
                  }}
                  // onMouseEnter={() => handleHover(brandName)}
                  // onMouseLeave={() => handleHover(null)}
                  style={{
                    background: selectedBrand === brandName ? "#EBEBEB" : "",
                    borderRadius: selectedBrand === brandName ? "6px" : "",
                  }}
                >
                  <h5 className="list-title">{brandName}</h5>
                  <p className="description">Domain Available</p>
                </div>
              </OverlayTrigger>
            );
          })
        ) : (
          <p>Loading.........</p>
        )}
      </div>
      {/* {BrandNameobj && (
        <Modal show={BrandNameobj} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        </Modal>
      )} */}
    </>
  );
};
export default Listing;