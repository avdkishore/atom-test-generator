'use babel';

export default function getKeyInfo(rawValue) {
  const keyInfo = { value: '', isRequired: /.isRequired$/g.test(rawValue) };

  if (rawValue.indexOf('PropTypes.shape') === 0) {
    keyInfo.value = '{}';
  } else if (rawValue.includes('PropTypes.bool')) {
    keyInfo.value = 'true';
  } else if (rawValue.includes('PropTypes.func')) {
    keyInfo.value = 'jest.fn()';
  } else if (rawValue.includes('PropTypes.number')) {
    keyInfo.value = '100';
  } else if (rawValue.includes('PropTypes.object')) {
    keyInfo.value = '{}';
  } else if (rawValue.includes('PropTypes.string')) {
    keyInfo.value = '\'Rise of sun\'';
  } else {
    keyInfo.value = '{}';
  }
  return keyInfo;
}
