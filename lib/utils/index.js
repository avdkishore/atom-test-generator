import fs from 'fs';
import getPropTypes from './getPropTypes';

const data = fs.readFileSync('./test.js', { encoding: 'utf8' });

if (data) {
  const position = data.indexOf('propTypes =');
  // to check the response using console.log()
  if (position > 0) console.log(getPropTypes(data, position + 'propTypes ='.length)); // eslint-disable-line
}
