declare module "formidable-serverless" {
  import { IncomingForm } from "formidable";

  class IncomingFormCustom extends IncomingForm {
    static IncomingForm: any;
    // Add any custom declarations here if needed
  }

  export = IncomingFormCustom;
}
