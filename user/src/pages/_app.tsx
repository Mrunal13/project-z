import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/index.css";
import "../styles/customized.css";

import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/layout/logo";
import Footer from "@/components/layout/footer";
// import "../styles/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      {/* <Header /> */}
      <Component {...pageProps} />
      {/* <Footer /> */}
    </>
  );
}

export default MyApp;
