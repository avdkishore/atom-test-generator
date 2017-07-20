import fs from 'fs';
import getPropTypes from './getPropTypes';

const data = fs.readFileSync('./test.js', { encoding: 'utf8' });

if (data) {
  const position = data.indexOf('propTypes =');
  if (position > 0) getPropTypes(data, position);
}
