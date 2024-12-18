export const caesarCipher = (text, shift) => {
    return text
      .split('') 
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const charCode = char.charCodeAt(0);
          const offset = charCode >= 65 && charCode <= 90 ? 65 : 97;
          return String.fromCharCode(((charCode - offset + shift) % 26 + 26) % 26 + offset);
        }
        return char;
      })
      .join('');
};

export const caesarDecrypt = (text, shift) => {
  return caesarCipher(text, -shift);
};