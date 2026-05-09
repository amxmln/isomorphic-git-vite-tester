// only version of Buffer I could find that worked without a build-step
import { Buffer } from 'https://cdn.skypack.dev/buffer';
import http from 'https://unpkg.com/isomorphic-git/http/web/index.js';

const app = document.querySelector('#app');
const output = document.createElement('pre');
const cloneButton = document.createElement('button');

window.Buffer = Buffer;

function log(text) {
  output.innerText += `\n${text}`;
}

async function startClone() {
  log('\n\nCleaning up');
  const fs = new LightningFS('fs', { wipe: true });
  const dir = '/tutorial';
  let lastPhase;

  log('Creating dir');
  await fs.promises.mkdir(dir);

  log('Starting clone of "https://github.com/isomorphic-git/isomorphic-git"');
  try {
    await git.clone({
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

cloneButton.innerText = 'Start clone';
cloneButton.addEventListener('click', startClone);

app.appendChild(cloneButton);
app.appendChild(output);
