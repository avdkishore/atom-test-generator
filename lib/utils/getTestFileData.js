'use babel';

import getMockValue from './getMockValue';

export default function getTestFileData(propObj) {
  let fileData = 'const propObj = {\n';
  const keys = Object.keys(propObj);
  const lastKeyIndex = keys.length - 1;

  keys.forEach((key, index) => {
    fileData += `  ${key}: ${getMockValue(propObj[key])}${index !== lastKeyIndex ? ',' : ''}\n`;
  });

  fileData += '};';

  return fileData;
}
