'use babel';

import fs from 'fs';
import parse from './parse';

export function getTestFileData({ moduleName = '', props = [] }) {
  const lastKeyIndex = props.length - 1;
  let isSpy = false;

  // create test file data
  let fileData = 'import React from \'react\';\nimport { mountWithContext } from \'helper\';\n';
  const chai = 'import { expect } from \'chai\';\n\n';
  let wrapperString = `const wrapper = mountWithContext(\n     <${moduleName}\n`;
  let propObjString = 'const propObj = {\n';
  let keysString = '';

  props.forEach((entry, index) => {
    const comma = index === lastKeyIndex ? '' : ',';

    wrapperString += `       ${entry[0]}={${entry[0]}}\n`;
    keysString += ` ${entry[0]}${comma}`;
    propObjString += `  ${entry[0]}: ${entry[1].mockedValue}${comma}\n`;
    if (!isSpy && entry[1].type.name === 'func') isSpy = true;
  });

  const sinon = isSpy ? 'import { spy } from \'sinon\';\n' : '';

  propObjString += '};';
  wrapperString = `${wrapperString}     />\n   );`;

  // complete head block
  fileData += `${sinon}${chai}${propObjString}\n\nimport ${moduleName} from './${moduleName}';\n\n`;

  // complete describe block
  fileData += `describe('<${moduleName} />', () => {\n  const {${keysString} } = propObj;\n  ${wrapperString}\n});\n`;

  return { fileData, props, moduleName, propObjString, wrapperString };
}

function isDirExists(dir) {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (e) {
    return false;
  }
}

function isFileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (e) {
    return false;
  }
}


export default function generate(src, cb = () => {}) {
  parse(src, (err, { moduleName, props, testFilePath, testFileDir } = {}) => {
    if (err) return cb(err);

    if (!isDirExists(testFileDir)) {
      fs.mkdir(testFileDir);
    } else if (isFileExists(testFilePath)) {
      return cb({ jgripErr: true, message: 'File already exists.' });
    }

    const { fileData } = getTestFileData({ moduleName, props });

    return fs.writeFile(testFilePath, fileData, { encodeing: 'utf8' }, (error) => {
      if (error) return cb(err);
      return cb(null, { props, moduleName });
    });
  });
}
