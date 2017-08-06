#! /usr/bin/env node

/* eslint-disable no-console */
const path = require('path');

const testFile = null;

try {
  testFile = require('./utils/testFile').default; // eslint-disable-line
} catch (e) {
  console.log('please run `npm run build`');
}

if (!process.argv[1]) {
  console.log('Source file is not defined.'); // eslint-disable-line
}
const promise = new Promise((resolve) => {
  testFile(path.join(process.env.PWD, process.argv[2]), resolve);
});

promise.then(() => {
  console.log('created');
});
