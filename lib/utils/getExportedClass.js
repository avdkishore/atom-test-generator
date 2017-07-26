'use babel';

export default function getExportedClass(fileData) {
  let moduleName = '';
  if (fileData) {
    // get mining position
    let miningPos = fileData.indexOf('export default class ') + 'export default class '.length;
    if (miningPos > ('export default class '.length - 1)) {
      for (let i = miningPos; !(fileData.charCodeAt(i) === 32); i += 1) {
        moduleName += fileData[i];
      }
      return moduleName;
    } else if (fileData.indexOf('connect') > -1) {
      // to get mining postion skip if there is any code inside connect
      for (let i = fileData.indexOf('connect') + 'connect'.length, count = 0; i < fileData.length; i += 1) {
        if (fileData[i] === '(') {
          count += 1;
        } else if (fileData[i] === ')') {
          count -= 1;
          if (count === 0) {
            miningPos = i + 1;
            break;
          }
        }
      }
      // mining for getting module name
      for (let i = miningPos, count = 0; i < fileData.length; i += 1) {
        if (fileData[i] === '(') {
          count += 1;
        } else if (fileData[i] === ')') {
          count -= 1;
          if (count === 0) break;
        } else {
          moduleName += fileData[i];
        }
      }
      return moduleName;
    }
    return '';
  }
  return '';
}
