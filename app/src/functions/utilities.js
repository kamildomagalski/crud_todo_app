/**
 * Sort by enum property operation
 * @param {array} priorityArray- array of priority params, listed from most relevant to the least
 * @param {string} sortingType- choose 'ascending or 'descending'
 * @param {array} dataArray- enter an array of objects you want to sort
 * @param {string} sortingKey- name of the key you want to sort through
 * @returns {*} returns a new, sorted array
 */
export function sortByEnumProperty(
  priorityArray,
  sortingType,
  dataArray,
  sortingKey
) {
  let priorityIndexArray;

  //changes ascending <-> descending
  if (sortingType === "ascending") {
    priorityIndexArray = priorityArray;
  } else if (sortingType === "descending") {
    priorityIndexArray = priorityArray.reverse();
  }
  //make a copy to proceed sorting on it
  let tmp = dataArray.map((el) => el);

  //sort function
  tmp.sort(function (a, b) {
    const firstItem = priorityIndexArray.indexOf(a[`${sortingKey}`]);
    const secondItem = priorityIndexArray.indexOf(b[`${sortingKey}`]);
    return firstItem - secondItem;
  });

  //returns new array after sorting
  return tmp;
}

/**
 * Sort by property operation
 * @param {string} sortingType- choose 'ascending or 'descending'
 * @param {array} dataArray- enter an array of objects you want to sort
 * @param {string} sortingKey- name of the key you want to sort through
 * @returns {*} returns a new, sorted array
 */
export function sortByProperty(sortingType, dataArray, sortingKey) {
  let numA, numB;
  //reverse sorting based on sortingType value
  if (sortingType === "ascending") {
    numA = -1;
    numB = 1;
  } else if (sortingType === "descending") {
    numA = 1;
    numB = -1;
  }
  //make a copy of an existing array
  let tmp = dataArray.map((el) => el);
  //sorting function
  tmp.sort(function (a, b) {
    if (a[`${sortingKey}`].toLowerCase() < b[`${sortingKey}`].toLowerCase()) {
      return numA;
    }
    if (a[`${sortingKey}`].toLowerCase() > b[`${sortingKey}`].toLowerCase()) {
      return numB;
    }
    return 0;
  });
  //returns new array after sorting
  return tmp;
}
