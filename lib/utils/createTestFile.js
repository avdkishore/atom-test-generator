'use babel';

import getPropObj from './getPropObj';
import getTestFileData from './getTestFileData';

export default function createTestFile(data) {
  if (data) {
    const position = data.indexOf('propTypes =');
    // to check the response using console.log()
    if (position > 0) {
      console.log(getTestFileData(getPropObj(data, position + 'propTypes ='.length)));
    }
  }
}
