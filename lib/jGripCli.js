#! /usr/bin/env node
// elsint-disable
const path = require('path');
const testFile = require('./testFile').default; // eslint-disable-line

if (!process.argv[1]) {
  console.log('Source file is not defined.'); // eslint-disable-line
}
const promise = new Promise((resolve) => {
  testFile(path.join(process.env.PWD, process.argv[2]), resolve);
});

promise.then(() => {
  console.log('created');
});
