import type { NextPage } from "next";
import Categories from "views/Categories";
import Layout from "views/Layout";

const categories: NextPage = () => {
  return (
    <Layout path="categories">
      <Categories />
    </Layout>
  );
};

export default categories;
