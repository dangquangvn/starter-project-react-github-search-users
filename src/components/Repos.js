import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { GithubContext, useGlobalContext } from "../context/context";
import { countItems } from "../utils";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { githubRepos } = useGlobalContext();
  /**
   *  [
        {
          label: "HTML",
          value: "10",
        },
        {
          label: "CSS",
          value: "58",
        },
        {
          label: "Javascript",
          value: "40",
        },
      ];
   */
  // const mostLanguages = githubRepos.reduce((acc,cur)=>{

  // },{})
  // todo: method 1 -> using forEach
  // let mostLanguages = [];
  // const key = "language";
  // const value = "value";
  // githubRepos.forEach((repo, index) => {
  //   console.log("item[key]", repo[key]);
  //   if (mostLanguages.some((item) => item[key] === repo[key])) {
  //     mostLanguages.forEach((item) => item[value]++);
  //   } else {
  //     let objTemp = {};
  //     objTemp[key] = repo[key];
  //     objTemp[value] = 1;
  //     // mostLanguages.push({ language: repo[key], value: 0 });
  //     mostLanguages.push(objTemp);
  //   }
  //   console.table(
  //     "🚀TCL: ~ file: Repos.js ~ line 32 ~ Repos ~ mostLanguages",
  //     mostLanguages
  //   );
  // });

  // todo: method 2 -> using reduce
  // let mostLanguages = [];
  // const keyData = "language";
  // const key = "label";
  // const value = "value";
  // mostLanguages = githubRepos.reduce((acc, curr) => {
  //   const keyTemp = curr[keyData]; // javascript
  //   if (!keyTemp) return acc;
  //   const index = acc.findIndex((item) => {
  //     console.log(
  //       `item[key]: ${item[key]} ${
  //         /*acc[0][label] == javascript */ " "
  //       }, keyTemp: ${keyTemp} ${/*javascript*/ " "}`
  //     );
  //     return item[key] === keyTemp;
  //   });
  //   console.log(`index: ${index}`);
  //   if (index > -1) {
  //     ++acc[index].value; // 1 --> 2
  //   } else {
  //     let obj = {};
  //     obj[key] = keyTemp;
  //     obj[value] = 1;
  //     acc.push(obj);
  //   }
  //   console.log(`acc --> ${JSON.stringify(acc)}`);
  //   return acc;

  //   // return acc[keyTemp] ? ++acc[keyTemp] : (acc[keyTemp] = 1), acc;
  // }, []);

  //todo: method 3: using function
  // const mostLanguages = countItems(githubRepos, "language", "label", "value");

  //todo: method 4: Most Used Language tutorial by john smilga
  // let mostLanguages = githubRepos.reduce((total, item) => {
  //   const { language } = item;
  //   if (!language) return total;
  //   if (!total[language]) {
  //     total[language] = { label: language, value: 1 };
  //   } else {
  //     // ++total[language];
  //     total[language] = {
  //       ...total[language],
  //       value: total[language].value + 1,
  //     };
  //   }
  //   return total;
  // }, {});
  // mostLanguages = Object.values(mostLanguages)
  //   .sort((a, b) => b.value - a.value)
  //   .slice(0, 5);

  //todo: star per language
  // let starPerLang = githubRepos.reduce((total, item) => {
  //   const { language, stargazers_count } = item;
  //   if (!language) return total;
  //   if (!total[language]) {
  //     total[language] = { label: language, value: stargazers_count };
  //   } else {
  //     total[language] = {
  //       ...total[language],
  //       value: total[language].value + stargazers_count,
  //     };
  //   }
  //   return total;
  // }, {});
  // starPerLang = Object.values(starPerLang)
  //   .sort((a, b) => b.value - a.value)
  //   // .map((item) => ({ ...item, value: item.value.toString() }))
  //   .slice(0, 5);

  //todo: combine mostUsedLang with mostPopularLang
  const languagesObj = githubRepos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
        // value: total[language].value + stargazers_count,
      };
    }
    return total;
  }, {});
  console.log(
    "🚀TCL: ~ file: Repos.js ~ line 135 ~ languagesObj ~ languagesObj",
    languagesObj
  );

  const mostUsedLanguage = Object.values(languagesObj)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const mostPopularLanguage = Object.values(languagesObj)
    .map((item) => ({ ...item, value: item.stars }))
    .slice(0, 5);

  const chartData = [
    {
      label: "HTML",
      value: "10",
    },
    {
      label: "CSS",
      value: "58",
    },
    {
      label: "Javascript",
      value: "40",
    },
  ];
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsedLanguage} />
        <div className=''></div>
        <Doughnut2D data={mostPopularLanguage} />
        <div className=''></div>
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
