const polybiusSquare = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I/J', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z'],
];

export const polybiusEncrypt = (text) => {
  return text
    .toUpperCase()
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      for (let i = 0; i < polybiusSquare.length; i++) {
        for (let j = 0; j < polybiusSquare[i].length; j++) {
          if (polybiusSquare[i][j].includes(char)) {
            return `${i + 1}${j + 1}`;
          }
        }
      }
      return char;
    })
    .join('');
};

export const polybiusDecrypt = (code) => {
  return code
    .split(' ')
    .map((word) =>
      word
        .match(/..?/g)
        .map((num) => {
          const [i, j] = [parseInt(num[0], 10) - 1, parseInt(num[1], 10) - 1];
          return polybiusSquare[i][j];
        })
        .join('')
    )
    .join(' ');
};
