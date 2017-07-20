// function to get the
function getPropTypes(fileData, miningPos) {
  let string = '';

  for (let i = miningPos, count = 0; i < fileData.length; i += 1) {
    string += fileData[i];

    if (fileData[i] === '{') {
      count += 1;
    } else if (fileData[i] === '}') {
      count -= 1;
      if (count === 0) break;
    }
  }
  return string;
}

export default getPropTypes;
