import MultiStepForm from "@/components/step-form/MultiStepForm";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Come Explore Childhood With Us." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />  
      </Head>
      <MultiStepForm />
    </>
  );
}
