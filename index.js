"use strict";

// Because we are hashing the string for optimal comparison, we must be certain the keys
// will always be serialized into the same order.
// This is especially important if the target object has nested objects
// https://stackoverflow.com/questions/16167581/sort-object-properties-and-json-stringify
const deterministicStringify = require('json-stable-stringify');


function calculateObjectHash (obj={}) {
  // JSON.stringify the object in a very consistent manner
  return calculateStringHash(deterministicStringify(obj));
}

// Get Java interpretation of a string's hash as an integer
// Note: SOME collision risk but quite small (not a big concern anyway)
// Alternative version is just using the str as the key itself... so return str;
// https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
function calculateStringHash (str="") {
  let hash = 0;

  if (str.length == 0) {
    return hash;
  }
  
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  return hash;
}

module.exports = {
  calculateObjectHash: calculateObjectHash,
  calculateStringHash: calculateStringHash,
};
