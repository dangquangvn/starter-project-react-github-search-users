import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext, useGlobalContext } from "../context/context";
const Dashboard = () => {
  const data = useGlobalContext();
  console.log("🚀TCL: ~ file: Dashboard.js ~ line 7 ~ Dashboard ~ data", data);
  return (
    <main>
      <Navbar />
      <Info />
      <User />
      {/* <h2>Dashboard Page</h2> */}
    </main>
  );
};

export default Dashboard;
