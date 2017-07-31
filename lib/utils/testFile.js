'use babel';

import fs from 'fs';
import path from 'path';
import getPropObj from './getPropObj';
import getExportedClass from './getExportedClass';

export function getTestFileData(exportedClass, propObj) {

  const keys = Object.keys(propObj);
  const lastKeyIndex = keys.length - 1;

  // create test file data
  let fileData = 'import React from \'react\';\nimport { mount } from \'enzyme\';\n\n';
  let wrapperProps = '';
  let propObjString = 'const propObj = {\n';

  keys.forEach((key, index) => {
    propObjString += `  ${key}: ${propObj[key].value}${index !== lastKeyIndex ? ',' : ''}\n`;
    wrapperProps += `       ${key}={${key}}\n`;
  });

  propObjString += '};';

  fileData += `${propObjString}\n\n`;

  fileData += `import ${exportedClass} from './${exportedClass}';\n\n`;

  const wrapperString = `const wrapper = mount(\n     <${exportedClass}\n${wrapperProps}     />\n   );`;
  const testCase = `describe('<${exportedClass} />', () => {\n  const { ${keys} } = propObj;\n  ${wrapperString}\n});`;

  fileData += testCase;

  return { fileData, keys, propObjString, wrapperString };
}

export default function testFile(src, cb = () => {}) {
  console.log('ujjwal');
  return fs.readFile(src, 'utf8', (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line
      return cb();
    }
    if (data) {
      let propObj = {};
      let exportedClass = '';


      // get exported class
      try {
        exportedClass = getExportedClass(data);
      } catch (e) {
        exportedClass = '';
      }

      // get propObj
      try {
        propObj = getPropObj(data.replace(/(\r\n|\n|\r|\s)/gm, ''));
      } catch (e) {
        propObj = {};
      }

      const { fileData, keys } = getTestFileData(exportedClass, propObj);

      // create file path
      const des = `${path.dirname(src)}/${exportedClass}.jest.test.js`;

      // write inside file
      return fs.writeFile(des, fileData, { encodeing: 'utf8' }, (error) => {
        if (error) {
          console.log(error); // eslint-disable-line
        }
        return cb({ exportedClass, propObj, keys });
      });
    }
    return cb();
  });
}
