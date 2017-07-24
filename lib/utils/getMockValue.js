'use babel';

export default function getMockValue(value) {
  if (value.includes('PropTypes.shape')) {
    return '"Shape object", //mock these values according to your requirement';
  } else if (value.includes('PropTypes.bool')) {
    return 'true';
  } else if (value.includes('PropTypes.func')) {
    return 'jest.fn()';
  } else if (value.includes('PropTypes.number')) {
    return '100';
  } else if (value.includes('PropTypes.object')) {
    return '{}';
  } else if (value.includes('PropTypes.string')) {
    return 'Rise of sun';
  }
  return '//mock these values according to your requirement';
}
