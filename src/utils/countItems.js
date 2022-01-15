/**
 *
 * @param {array} array : source data -> githubRepos
 * @param {*} keyData : key want to get from data -> 'language'
 * @param {*} customKey -> 'label'
 * @param {*} customValue -> 'value'
 * @returns object of array
 * keyTemp = curr[keyData] = item[customKey] -> javascript
 *
 */
export const countItems = (array, keyData, customKey, customValue) => {
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
