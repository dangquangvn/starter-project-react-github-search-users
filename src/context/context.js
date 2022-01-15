import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";
import useFetch from "../hooks/useFetch";

import dotenv from "dotenv";
dotenv.config();
const rootUrl = "https://api.github.com";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  console.log("test", process.env.REACT_APP_DOMAIN);
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);
  // request loading
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState({ show: false, msg: "" });
  const [requests, setRequests] = useState(60);
  console.log(
    "🚀TCL: ~ file: context.js ~ line 20 ~ AppProvider ~ requests",
    requests
  );
  // search
  const [searchQuery, setSearchQuery] = useState("");
  const [isWaiting, setWaiting] = useState(true);
  let url;
  if (searchQuery) {
    url = `${rootUrl}/users/${searchQuery}`;
  } else {
    url = rootUrl;
  }

  const checkRequests = async () => {
    const {
      data: {
        rate: { remaining },
      },
    } = await axios.get(`${rootUrl}/rate_limit`);
    setRequests(remaining);
    console.log(
      "🚀TCL: ~ file: context.js ~ line 37 ~ checkRequests ~ remaining",
      remaining
    );
    if (remaining === 0) {
      setError({
        show: true,
        msg: "sorry, you have exceeded your hourly rate limit",
      });
    }
  };

  const fetchUser = async (url) => {
    setLoading(true);
    toggleError();
    try {
      const response = await axios.get(url);
      console.log(
        "🚀TCL: ~ file: context.js ~ line 58 ~ fetchUser ~ response",
        response
      );
      const { followers_url, login } = response.data;

      // const repos = await axios
      // - [Repos](https://api.github.com/users/john-smilga/repos?per_page=100)
      // - [Followers](https://api.github.com/users/john-smilga/followers)
      //= METHOD 1: flow: when get res DONE -> fetch repos DONE -> fetch forks
      // repos and forks could get separately
      // const repos = await axios.get(
      //   `${rootUrl}/users/${login}/repos?per_page=100`
      // );
      // setGithubRepos(repos.data);
      // const forks = await axios.get(followers_url);
      // setGithubFollowers(forks.data);
      // setGithubUser(response.data);
      //= METHOD 2: use Promise.allSettled
      /**
       * COMPARE: Promise.all vs Promise.allSettled
       */
      const [repos, followers] = await Promise.allSettled([
        //& DO NOT use await in Promise.all
        // put that outside instead, because await convert promise into object
        /*await*/ axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
        /*await*/ axios.get(followers_url),
      ]);
      console.log(
        "🚀TCL: ~ file: context.js ~ line 86 ~ fetchUser ~ repos",
        repos
      );
      console.log(
        "🚀TCL: ~ file: context.js ~ line 81 ~ fetchUser ~ followers",
        followers
      );
      const status = "fulfilled";
      if (repos.status === status) {
        setGithubRepos(repos.value.data);
      }
      if (followers.status === status) {
        setGithubFollowers(followers.value.data);
      }
      setLoading(false);
    } catch (error) {
      toggleError(true, "There Is No User With That Username");
      console.log("async catch", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // checkRequests();
  }, []);
  // useEffect(() => {
  //   fetchUser(`${rootUrl}/users/wesbos`);
  // }, []);
  const toggleError = (show = false, msg = "") => {
    setError({ show, msg });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    fetchUser(`${rootUrl}/users/${searchQuery}`);
    // fetchData)
  };

  return (
    <AppContext.Provider
      value={{
        githubUser,
        githubRepos,
        githubFollowers,
        searchQuery,
        setSearchQuery,
        handleSearch,
        handleSubmit,
        requests,
        error,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
