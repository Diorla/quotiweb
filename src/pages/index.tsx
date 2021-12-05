import type { NextPage } from "next";
import Home from "views/Home";
import Layout from "views/Layout";

const home: NextPage = () => {
  return (
    <Layout path="today">
      <Home />
    </Layout>
  );
};

export default home;
