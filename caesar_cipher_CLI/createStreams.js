const fs = require('fs');
const CaesarAlgorithm = require('./caesarAlgorithm');

const createStreams = (action, shift, input, output) => {
  const readableStrem = input ? fs.createReadStream(input) : process.stdin;

  const transformStream = new CaesarAlgorithm({ shift, action });

  const writableStream = output
    ? fs.createWriteStream(output, { flags: 'a' })
    : process.stdout;

  return { readableStrem, transformStream, writableStream };
};

module.exports = createStreams;
