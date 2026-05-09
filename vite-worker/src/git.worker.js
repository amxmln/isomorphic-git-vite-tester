import FS from '@isomorphic-git/lightning-fs';
import { Buffer } from 'buffer';
import { clone } from 'isomorphic-git';
import http from 'isomorphic-git/http/web';

self.Buffer = Buffer;

function log(text) {
  self.postMessage({ type: 'log', data: text });
}

async function startClone() {
  log('\n\nCleaning up');
  const fs = new FS('fs', { wipe: true });
  const dir = '/tutorial';
  let lastPhase;

  log('Creating dir');
  await fs.promises.mkdir(dir);

  log('Starting worker clone of "https://github.com/isomorphic-git/isomorphic-git"');
  try {
    await clone({
      fs,
      http,
      dir,
      corsProxy: 'https://cors.isomorphic-git.org',
      url: 'https://github.com/isomorphic-git/isomorphic-git',
      ref: 'main',
      singleBranch: true,
      depth: 10,
      onProgress(e) {
        if (lastPhase !== e.phase) {
          log(e.phase);
          lastPhase = e.phase;
        }
      }
    });
    log('\nClone successful, here is the content:\n');
    log((await fs.promises.readdir(dir)).join(',\n'));
  } catch (err) {
    console.error(err);
    log('Error: ' + err.message);
  }
}

self.addEventListener('message', (e) => {
  switch (e.data?.type) {
    case 'clone':
      startClone();
      break;
    default:
    // no op
  }
});
