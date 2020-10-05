const util = require('util');
const fs = require('fs');
const { ENCODE, DECODE } = require('./constants');
const access = util.promisify(fs.access);

async function validateArgv(action, shift, input, output) {
  if (action !== ENCODE && action !== DECODE) {
    throw new Error(
      'Not valid "action" argument, should be one of "encode or "decode"\n'
    );
  }
  if (!Number.isInteger(shift)) {
    throw new Error('Not valid "shift" argument, should be integer number\n');
  }
  if (input) {
    await access(input, fs.R_OK).catch(() => {
      throw new Error('There is no access to "input" argument\n');
    });
  }
  if (output) {
    await access(output, fs.W_OK).catch(() => {
      throw new Error('There is no access to "output" argument\n');
    });
  }
}

module.exports = validateArgv;
