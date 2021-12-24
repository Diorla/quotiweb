import type { NextPage } from "next";
import Upcoming from "views/Upcoming";
import Layout from "views/Layout";

const upcoming: NextPage = () => {
  return (
    <Layout path="upcoming">
      <Upcoming />
    </Layout>
  );
};

export default upcoming;
