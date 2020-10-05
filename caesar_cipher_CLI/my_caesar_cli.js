const argv = require('minimist')(process.argv.slice(2));
const stream = require('stream');
const { promisify } = require('util');

const validateArgv = require('./validateArgv');
const createStreams = require('./createStreams');

const pipeline = promisify(stream.pipeline);

async function caesar_cipher() {
  try {
    const { s, shift, i, input, o, output, a, action } = argv;

    const actionSource = a || action;
    const shiftSource = s || shift;
    const inputSource = i || input;
    const outputSource = o || output;

    await validateArgv(actionSource, shiftSource, inputSource, outputSource);

    const { readableStrem, transformStream, writableStream } = createStreams(
      actionSource,
      shiftSource,
      inputSource,
      outputSource
    );

    pipeline(readableStrem, transformStream, writableStream).then(
      () => {
        console.log('finished success');
      },
      () => {
        throw new Error('process finished with error');
      }
    );
  } catch (error) {
    process.stderr.write(error.message);
  }
}

caesar_cipher();
