import { useState } from 'react';

import './App.css';
import { caesarCipher, caesarDecrypt } from './caesar-algorithm';
import { atbashCipher, atbashDecrypt } from './atbash-algorithm';
import { rot13Cipher, rot13Decrypt } from './rot13-algorithm';
import { substitutionCipher, substitutionDecrypt } from './substitution-algorithm';
import { polybiusEncrypt, polybiusDecrypt } from './polybius-algorithm';

function App() {
  const [inputText, setInputText] = useState('');
  const [shiftValue, setShiftValue] = useState(3);
  const [outputText, setOutputText] = useState('');
  const [cipherMethod, setCipherMethod] = useState('caesar');
  const [substitutionKey, setSubstitutionKey] = useState('QWERTYUIOPLKJHGFDSAZXCVBNM'); // Default substitution key

  const handleShift = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 0;
    setShiftValue(value % 26);
  };

  const handleSubstitutionKeyChange = (e) => {
    const key = e.target.value.toUpperCase();

    // Validate the substitution key
    if (key.length !== 26) {
      alert('Substitution key must be exactly 26 characters long.');
      return;
    }

    const uniqueKey = new Set(key.split(''));
    if (uniqueKey.size !== 26 || ![...uniqueKey].every((char) => /^[A-Z]$/.test(char))) {
      alert('Substitution key must only contain unique alphabetic characters.');
      return;
    }

    setSubstitutionKey(key); // If valid, save the substitution key
  };

  const handleCipherMethodChange = (e) => {
    setCipherMethod(e.target.value);
    setOutputText('');
  };

  const handleEncrypt = () => {
    let encrypted;
    if (cipherMethod === 'caesar') {
      encrypted = caesarCipher(inputText, shiftValue);
    } else if (cipherMethod === 'atbash') {
      encrypted = atbashCipher(inputText);
    } else if (cipherMethod === 'rot13') {
      encrypted = rot13Cipher(inputText);
    } else if (cipherMethod === 'substitution') {
      encrypted = substitutionCipher(inputText, substitutionKey);
    } else if (cipherMethod === 'polybius') {
      encrypted = polybiusEncrypt(inputText);
    }
    setOutputText(encrypted);
  };

  const handleDecrypt = () => {
    let decrypted;
    if (cipherMethod === 'caesar') {
      decrypted = caesarDecrypt(inputText, shiftValue);
    } else if (cipherMethod === 'atbash') {
      decrypted = atbashDecrypt(inputText);
    } else if (cipherMethod === 'rot13') {
      decrypted = rot13Decrypt(inputText);
    } else if (cipherMethod === 'substitution') {
      decrypted = substitutionDecrypt(inputText, substitutionKey);
    } else if (cipherMethod === 'polybius') {
      decrypted = polybiusDecrypt(inputText);
    }
    setOutputText(decrypted);
  };

  return (
    <div className="App">
      <h1>Encryption App</h1>
      <div className="input-container">
        <textarea
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => {
            setOutputText('');
            setInputText(e.target.value);
          }}
        />
      </div>

      <div className="cipher-method-container">
        <label className="cipher-label">Select Cipher Method</label>
        <div className="select-container">
          <select
            value={cipherMethod}
            onChange={handleCipherMethodChange}
            className="cipher-select"
          >
            <option value="caesar">Caesar Cipher</option>
            <option value="atbash">Atbash Cipher</option>
            <option value="rot13">ROT13 Cipher</option>
            <option value="substitution">Substitution Cipher</option>
            <option value="polybius">Polybius Square Cipher</option>
          </select>
        </div>
      </div>

      {cipherMethod === 'caesar' && (
        <div className="shift-container">
          <label htmlFor="shiftValue">Shift Value: </label>
          <input
            type="number"
            id="shiftValue"
            value={shiftValue}
            onChange={handleShift}
            min="-25"
            max="25"
          />
        </div>
      )}

      {cipherMethod === 'substitution' && (
        <div className="substitution-container">
          <label htmlFor="subKey">Substitution Key: </label>
          <input
            type="text"
            id="subKey"
            value={substitutionKey}
            onChange={handleSubstitutionKeyChange}
          />
        </div>
      )}

      <div className="action-buttons">
        <button
          onClick={handleEncrypt}
          disabled={!inputText}
          className={inputText ? 'encrypt' : 'encrypt enableEncrypt'}
        >
          Encrypt
        </button>
        <button
          onClick={handleDecrypt}
          disabled={!inputText}
          className={inputText ? 'decrypt' : 'decrypt enableDecrypted'}
        >
          Decrypt
        </button>
      </div>

      <div className="result-container">
        <h2>Output Text</h2>
        <p>{outputText}</p>
      </div>
    </div>
  );
}

export default App;
