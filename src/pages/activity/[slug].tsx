import type { NextPage } from "next";
import Activity from "views/Activity";
import Layout from "views/Layout";

const activity: NextPage = () => {
  return (
    <Layout path="activities">
      <Activity />
    </Layout>
  );
};

export default activity;
