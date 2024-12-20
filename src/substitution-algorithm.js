const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const substitutionCipher = (text, key) => {
  if (key.length !== 26) {
    throw new Error('Key must be exactly 26 characters long.');
  }

  const uniqueKey = new Set(key.toUpperCase());
  if (uniqueKey.size !== 26) {
    throw new Error('Key must contain only unique alphabetic characters.');
  }

  const keyMap = ALPHABET.split('').reduce((map, letter, i) => {
    map[letter] = key[i];
    map[letter.toLowerCase()] = key[i].toLowerCase();
    return map;
  }, {});

  return text
    .split('')
    .map((char) => (keyMap[char] ? keyMap[char] : char))
    .join('');
};

export const substitutionDecrypt = (text, key) => {
  if (key.length !== 26) {
    throw new Error('Key must be exactly 26 characters long.');
  }

  const uniqueKey = new Set(key.toUpperCase());
  if (uniqueKey.size !== 26) {
    throw new Error('Key must contain only unique alphabetic characters.');
  }

  const reverseKeyMap = key.split('').reduce((map, letter, i) => {
    map[letter] = ALPHABET[i];
    map[letter.toLowerCase()] = ALPHABET[i].toLowerCase();
    return map;
  }, {});

  return text
    .split('')
    .map((char) => (reverseKeyMap[char] ? reverseKeyMap[char] : char))
    .join('');
};
