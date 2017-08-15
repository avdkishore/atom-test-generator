'use babel';

export default function getKeyInfo(key) {
  if (key.type.name === 'object' || key.type.name === 'shape') {
    key.mockedValue = '{}';
  } else if (key.type.name === 'bool') {
    key.mockedValue = 'true';
  } else if (key.type.name === 'func') {
    key.mockedValue = 'jest.fn()';
  } else if (key.type.name === 'number') {
    key.mockedValue = '100';
  } else if (key.type.name === 'string') {
    key.mockedValue = 'Robbin Hood';
  } else if (key.type.name === 'array' || key.type.name === 'arrayOf') {
    key.mockedValue = '[]';
  } else if (key.type.name === 'enum') {
    key.mockedValue = key.type.value[0] && key.type.value[0].value;
  } else {
    key.mockedValue = '{}';
  }
  return key;
}
