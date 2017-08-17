'use babel';

import fs from 'fs';
import path from 'path';
import mockValue from './mockValue';

/*
 * Do not use es6 syntex to import react-docgen because it will break after transpile.
 * check this - https://github.com/reactjs/react-docgen/blob/master/src/main.js#L59. there is no
 * default export inside this file.
 */
const reactDocs = require('react-docgen');

function addProps(code, parsedData, cb) {
  // if data is null
  if (!code) return cb({ jgripErr: true, message: 'It is an empty file.' });

  try {
    const resolver = reactDocs.resolver.findAllComponentDefinitions;
    const coponentInfo = reactDocs.parse(code, resolver);

    parsedData.props = [];
    // add automaticatlly generated mocked vlaue

    const lastComponent = coponentInfo.pop();

    Object.keys(lastComponent.props).forEach((key) => {
      parsedData.props.push([key, mockValue(lastComponent.props[key])]);
    });

    return cb(null, parsedData);
  } catch (error) {
    return cb(error);
  }
}

// function to get parsed data
export default function parse(filePath, cb, codeInFile) {
  const parsedData = {};

  if (typeof filePath !== 'string') {
    return cb({ jgripErr: true, message: 'filePath should be a string.' });
  }

  const moduleName = (path.extname(filePath) === '.js') && path.basename(filePath, '.js');

  if (!moduleName) return cb({ jgripErr: true, message: 'It is not a Javascript file.' });

  const dirname = path.dirname(filePath);
  const isIndex = moduleName === 'index' || moduleName === 'Index';

  // add test file name and module name
  parsedData.moduleName = isIndex ? dirname.split(path.sep).pop() : moduleName;
  parsedData.testFileDir = isIndex ? `${path.dirname(dirname)}/tests` : `${dirname}/tests`;
  parsedData.testFilePath = `${parsedData.testFileDir}/${parsedData.moduleName}.test.js`;

  // return here if codeInFile is defined.
  if (codeInFile && typeof codeInfile === 'string') return addProps(codeInFile, parsedData, cb);

  // if code in file is not defined try to get from given file path
  return fs.readFile(filePath, 'utf8', (err, code) => {
    if (err) return cb(err);
    return addProps(code, parsedData, cb);
  });
}
