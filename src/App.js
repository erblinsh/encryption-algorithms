import { useState } from 'react';
import './App.css';
import { caesarCipher, caesarDecrypt } from './caesar-algorithm';
import { atbashCipher, atbashDecrypt } from './atbash-algorithm';

function App() {
  const [inputText, setInputText] = useState('');
  const [shiftValue, setShiftValue] = useState(3);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');
  const [cipherMethod, setCipherMethod] = useState('caesar');

  const handleShift = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value)) value = 0;
    setShiftValue(value % 26);
    setEncryptedText("");
    setDecryptedText("");
  };

  const handleCipherMethodChange = (e) => {
    setCipherMethod(e.target.value);
    setEncryptedText("");
    setDecryptedText("");
  };

  const handleEncrypt = () => {
    let encrypted;
    if (cipherMethod === 'caesar') {
      encrypted = caesarCipher(inputText, shiftValue);
    } else if (cipherMethod === 'atbash') {
      encrypted = atbashCipher(inputText);
    }
    setEncryptedText(encrypted);
    setDecryptedText("");
  };

  const handleDecrypt = () => {
    let decrypted;
    if (cipherMethod === 'caesar') {
      decrypted = caesarDecrypt(encryptedText, shiftValue);
    } else if (cipherMethod === 'atbash') {
      decrypted = atbashDecrypt(encryptedText);
    }
    setDecryptedText(decrypted);
  };

  return (
    <div className="App">
      <h1>Encryption App</h1>
      <div className="input-container">
        <textarea
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => { setEncryptedText(""); setDecryptedText(""); setInputText(e.target.value) }}
        />
      </div>
    
      <div className="cipher-method-container">
        <label className="cipher-label">Select Cipher Method</label>
        <div className="select-container">
          <select value={cipherMethod} onChange={handleCipherMethodChange} className="cipher-select">
            <option value="caesar">Caesar Cipher</option>
            <option value="atbash">Atbash Cipher</option>
          </select>
        </div>
      </div>


      {
        cipherMethod === 'caesar' &&
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
      }

      <button 
        onClick={handleEncrypt} 
        disabled={!inputText}
        className={inputText ? "encrypt" : "encrypt enableEncrypt"}>
        Encrypt
      </button>
      <button 
        onClick={handleDecrypt}
        disabled={!encryptedText}
        className={encryptedText ? "decrypt" : "decrypt enableDecrypted"} 
      >
        Decrypt
      </button>

      <div className="result-container">
        <h2>Encrypted Text</h2>
        <p>{encryptedText}</p>
        <h2>Decrypted Text</h2>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
}

export default App;
