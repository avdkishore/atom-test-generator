'use babel';

import fs from 'fs';
import path from 'path';
import getPropObjInfo from './getPropObjInfo';
import getExportedClass from './getExportedClass';

export function getTestFileData(exportedClass = '', entries = []) {
  const lastKeyIndex = entries.length - 1;

  // create test file data
  let fileData = 'import React from \'react\';\nimport { mount } from \'enzyme\';\n\n';
  let wrapperString = `const wrapper = mount(\n     <${exportedClass}\n`;
  let propObjString = 'const propObj = {\n';
  let keysString = '';

  entries.forEach((entry, index) => {
    const comma = index === lastKeyIndex ? '' : ',';

    wrapperString += `       ${entry[0]}={${entry[0]}}\n`;
    keysString += ` ${entry[0]}${comma}`;
    propObjString += `  ${entry[0]}: ${entry[1].value}${comma}\n`;
  });

  propObjString += '};';
  wrapperString = `${wrapperString}     />\n   );`;

  // complete head block
  fileData += `${propObjString}\n\nimport ${exportedClass} from './${exportedClass}';\n\n`;

  // complete describe block
  fileData += `describe('<${exportedClass} />', () => {\n  const { ${keysString} } = propObj;\n  ${wrapperString}\n});`;

  return { fileData, entries, propObjString, wrapperString };
}

export default function testFile(src, cb = () => {}) {
  return fs.readFile(src, 'utf8', (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line
      return cb();
    }
    if (data) {
      let entries = [];
      let exportedClass = '';


      // get exported class
      try {
        exportedClass = getExportedClass(data);
      } catch (e) {
        exportedClass = '';
      }

      // get propObj
      try {
        entries = getPropObjInfo(data.replace(/(\r\n|\n|\r|\s)/gm, ''));
      } catch (e) {
        entries = [];
      }

      const { fileData } = getTestFileData(exportedClass, entries);

      // create file path
      const des = `${path.dirname(src)}/${exportedClass}.jest.test.js`;

      // write inside file
      return fs.writeFile(des, fileData, { encodeing: 'utf8' }, (error) => {
        if (error) {
          console.log(error); // eslint-disable-line
        }
        return cb({ exportedClass, entries });
      });
    }
    return cb();
  });
}
