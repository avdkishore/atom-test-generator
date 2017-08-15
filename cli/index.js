#! /usr/bin/env node

/* eslint-disable no-console */
const path = require('path');

let generate = null;

try {
  generate = require('./utils/generate').default; // eslint-disable-line

  if (!process.argv[1]) {
    console.log('Source file is not defined.');
  }

  const promise = new Promise((resolve) => {
    generate(path.join(process.env.PWD, process.argv[2]), resolve);
  });

  promise.then((err) => {
    if (err) console.log(err);
    else console.log('Succesfully created.');
  });

} catch (e) {
  console.log(e);
}
