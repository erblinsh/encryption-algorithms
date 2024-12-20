export const rot13Cipher = (text) => {
  return text.replace(/[a-zA-Z]/g, (char) => {
    const isUpperCase = char >= 'A' && char <= 'Z';
    const base = isUpperCase ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
};

export const rot13Decrypt = rot13Cipher; // ROT13 decryption is the same as encryption
