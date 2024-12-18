export const atbashCipher = (text) => {
    return text
      .split('')
      .map((char) => {
        if (char.match(/[a-zA-Z]/)) {
          const charCode = char.charCodeAt(0);
          const base = charCode >= 65 && charCode <= 90 ? 65 : 97;
          const offset = 25 - (charCode - base);
          return String.fromCharCode(base + offset);
        }
        return char;
      })
      .join('');
  };

export const atbashDecrypt = atbashCipher; 