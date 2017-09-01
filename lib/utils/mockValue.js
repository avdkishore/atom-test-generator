'use babel';

const models = {
  group: 'factories(\'group\')',
  post: 'factories(\'post\')',
  profile: 'factories(\'profile\')',
  edition: 'factories(\'edition\')',
  category: 'factories(\'category\')',
  groups: 'factories(\'group\', null, 5)',
  posts: 'factories(\'post\', null, 5)',
  editions: 'factories(\'edition\', null, 5)',
  profiles: 'factories(\'profile\', null, 5)',
  categories: 'factories(\'category\', null, 5)'
};

export default function getKeyInfo(key, keyName) {
  if (key.type.name === 'object' || key.type.name === 'shape') {
    key.mockedValue = models[keyName] || '{}';
  } else if (key.type.name === 'bool') {
    key.mockedValue = 'true';
  } else if (key.type.name === 'func') {
    key.mockedValue = 'spy()';
  } else if (key.type.name === 'number') {
    key.mockedValue = '100';
  } else if (key.type.name === 'string') {
    key.mockedValue = '\'Robbin Hood\'';
  } else if (key.type.name === 'array' || key.type.name === 'arrayOf') {
    key.mockedValue = models[keyName] || '[]';
  } else if (key.type.name === 'enum') {
    key.mockedValue = key.type.value[0] && key.type.value[0].value;
  } else {
    key.mockedValue = '{}';
  }
  return key;
}
