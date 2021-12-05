import * as React from "react";
import type { NextPage } from "next";
import Home from "views/Home";
import Layout from "views/Layout";

const home: NextPage = () => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default home;
