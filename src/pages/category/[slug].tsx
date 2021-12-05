import type { NextPage } from "next";
import Category from "views/Category";
import Layout from "views/Layout";

const category: NextPage = () => {
  return (
    <Layout path="categories">
      <Category />
    </Layout>
  );
};

export default category;
