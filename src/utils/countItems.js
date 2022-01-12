export const countItems = (array, keyData, customKey, customValue) => {
  // mostLanguages = githubRepos.reduce((acc, curr) => {
  return array.reduce((acc, curr) => {
    const keyTemp = curr[keyData]; // javascript
    if (!keyTemp) return acc;
    const index = acc.findIndex((item) => {
      //console.log(`item[key]: ${item[keyData]}, keyTemp: ${keyTemp}, `);
      return item[customKey] === keyTemp;
    });
    //console.log(`index: ${index}`);
    if (index > -1) {
      // ++acc[keyTemp];
      ++acc[index].value;
    } else {
      let obj = {};
      obj[customKey] = keyTemp;
      obj[customValue] = 1;
      acc.push(obj);
      // acc[keyTemp] = 1;
    }
    // console.log(`acc --> ${JSON.stringify(acc)}`);
    return acc;
  }, []);
};
