'use babel';

import fs from 'fs';
import path from 'path';
import getPropObj from './getPropObj';
import getMockValue from './getMockValue';
import getExportedClass from './getExportedClass';

export function getTestFileData(data) {
  let propObj = {};
  let exportedClass = '';

  // get propObj
  try {
    propObj = getPropObj(data);
  } catch (err) {
    propObj = {};
  }

  // get exported class
  try {
    exportedClass = getExportedClass(data);
  } catch (err) {
    exportedClass = '';
  }

  const keys = Object.keys(propObj);
  const lastKeyIndex = keys.length - 1;

  // create test file data
  let fileData = 'import React from \'react\';\nimport { mountWithContext } from \'helper\';\n\nconst propObj = {\n';
  let wrapperProps = '';

  keys.forEach((key, index) => {
    fileData += `  ${key}: ${getMockValue(propObj[key])}${index !== lastKeyIndex ? ',' : ''}\n`;
    wrapperProps += `       ${key}={${key}}\n`;
  });

  fileData += '};\n\n';
  const testCase = `describe('<${exportedClass} />', () => {\n  const { ${keys} } = propObj;\n  const wrapper = mountWithContext(\n     <${exportedClass}\n${wrapperProps}     />\n   );\n});`;

  fileData += testCase;

  return { fileData, exportedClass };
}

export default function testFile(src, cb) {
  return fs.readFile(src, 'utf8', (err, data) => {
    if (err) {
      console.log('some error occured in reading file or file not exist.'); // eslint-disable-line
      return cb();
    }
    if (data) {
      const { fileData, exportedClass } = getTestFileData(data);

      // create file path
      const des = `${path.dirname(src)}/${exportedClass}.jest.test.js`;

      // write inside file
      return fs.writeFile(des, fileData, { encodeing: 'utf8' }, (error) => {
        if (error) {
          console.log(error); // eslint-disable-line
        }
        return cb();
      });
    }
    return cb();
  });
}
