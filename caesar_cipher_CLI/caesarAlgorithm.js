const { Transform } = require('stream');
const {
  ALPHABET_LENGTH,
  LOWERCASE_START_CODE,
  LOWERCASE_END_CODE,
  UPPERCASE_START_CODE,
  UPPERCASE_END_CODE,
  ENCODE
} = require('./constants');

class CaesarAlgorthm extends Transform {
  constructor(opt) {
    super(opt);
    this.shift =
      opt.action === ENCODE ? +opt.shift : ALPHABET_LENGTH - opt.shift;
  }

  _transform(chunk, encoding, callback) {
    try {
      const buffer = Buffer.from(chunk);
      const string = buffer.toString();

      const arrayOfUnicodeSymbols = [];
      for (let i = 0; i < string.length; i++) {
        const s = string[i];
        const code = string.charCodeAt(i);

        if (s.match(/[a-z]/i)) {
          const isLowercase =
            code >= LOWERCASE_START_CODE && code <= LOWERCASE_END_CODE;
          const isUppercase =
            code >= UPPERCASE_START_CODE && code <= UPPERCASE_END_CODE;

          let intialAlphabetCode;
          if (isLowercase) {
            intialAlphabetCode = LOWERCASE_START_CODE;
          } else if (isUppercase) {
            intialAlphabetCode = UPPERCASE_START_CODE;
          }

          const newCode =
            ((code - intialAlphabetCode + this.shift) % ALPHABET_LENGTH) +
            intialAlphabetCode;
          arrayOfUnicodeSymbols.push(newCode);
        } else {
          arrayOfUnicodeSymbols.push(code);
        }
      }
      const newString = String.fromCharCode(...arrayOfUnicodeSymbols);

      return callback(null, newString);
    } catch (err) {
      return callback(err);
    }
  }
}
module.exports = CaesarAlgorthm;
