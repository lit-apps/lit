/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// eslint-disable-next-line import/extensions
import * as assert from 'uvu/assert';
import {LitCli} from '../../lib/lit-cli.js';
import {LitConsole} from '../../lib/console.js';
import {BufferedWritable} from '../buffered-writable.js';
import {suite} from '../uvu-wrapper.js';

let outputStream: BufferedWritable;
let errorStream: BufferedWritable;
let cliConsole: LitConsole;

const test = suite();

test.before(() => {
  outputStream = new BufferedWritable();
  errorStream = new BufferedWritable();
  cliConsole = new LitConsole({
    stdout: outputStream,
    stderr: errorStream,
  });
});

test('stub test', async () => {
  const cli = new LitCli(
    ['labs', 'gen', '--framework', 'react', '--package', 'test-project'],
    {
      console: cliConsole,
    }
  );
  await cli.run();

  const output = outputStream.text;

  assert.equal(errorStream.buffer.length, 0);

  // TODO: change to actual test once more is fleshed out; for now the stub
  // command just outputs analyzed modules
  assert.match(output, 'element-a.ts');
});
