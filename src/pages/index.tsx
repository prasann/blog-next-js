import ContentArea from "../components/landing/ContentArea";
import MetaHeaders from "../components/MetaHeaders";
import React from "react";
import { GetStaticProps } from "next";
import generateMainFeeds from "../lib/feed";
import { SpeedInsights } from "@vercel/speed-insights/next"

const Home = () => {
  return (
    <>
      <MetaHeaders />
      <ContentArea />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  await generateMainFeeds();
  return {
    props: {
      dummyVar: [],
    },
  };
};

export default Home;
