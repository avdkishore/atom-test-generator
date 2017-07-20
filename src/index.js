var fs = require('fs');
var data = fs.readFileSync('./test.js', { encoding: 'utf8' });

if (!data) return null;

var position = data.indexOf('propTypes =');

if(position === - 1) return null;

function getString(fileData, miningPos) {
  var i;
  var count = 0;
  var string = '';
  for(i=miningPos; i<fileData.length; i++) {
    string = string + fileData[i];
    if(fileData[i] === '{') {
      count++
    }else if (fileData[i] === '}'){
      count--
      if(count === 0) break;
    }
  }
  return string;
}

console.log(getString(data, position + 'propTypes ='.length));
