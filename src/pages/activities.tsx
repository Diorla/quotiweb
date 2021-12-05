import type { NextPage } from "next";
import Activities from "views/Activities";
import Layout from "views/Layout";

const home: NextPage = () => {
  return (
    <Layout path="activities">
      <Activities />
    </Layout>
  );
};

export default home;
