const fs = require('fs');
const path = require('path');
const { clone } = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

function log(text) {
  console.log(text);
}

async function startClone() {
  const dir = path.join(process.cwd(), 'clone-output', 'tutorial');
  let lastPhase;

  log('\n\nCleaning up');
  if (fs.existsSync(path)) await fs.promises.rmdir(dir, { recursive: true });

  log('Creating dir');
  await fs.promises.mkdir(dir, { recursive: true });

  log('Starting clone of "https://github.com/isomorphic-git/isomorphic-git"');
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

startClone();
