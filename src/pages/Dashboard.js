import React from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { GithubContext, useGlobalContext } from "../context/context";
const Dashboard = () => {
  const { isLoading } = useGlobalContext();
  // console.log("🚀TCL: ~ file: Dashboard.js ~ line 7 ~ Dashboard ~ data", data);
  return (
    <main>
      <Navbar />
      <Search />
      {isLoading && (
        <img src={loadingImage} className='loading-img' alt='loading' />
      )}
      {!isLoading && (
        <>
          <Info />
          <User />
          <Repos />
        </>
      )}
      {/* <h2>Dashboard Page</h2> */}
    </main>
  );
};

export default Dashboard;
