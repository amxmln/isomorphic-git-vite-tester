import './style.css';

import GitWorker from './git.worker?worker';

const app = document.querySelector('#app');
const output = document.createElement('pre');
const cloneButton = document.createElement('button');
const worker = new GitWorker();

function log(text) {
  output.innerText += `\n${text}`;
}

async function startClone() {
  worker.postMessage({ type: 'clone', data: null });
}

cloneButton.innerText = 'Start clone';
cloneButton.addEventListener('click', startClone);

app.appendChild(cloneButton);
app.appendChild(output);

worker.addEventListener('message', (e) => {
  switch (e.data?.type) {
    case 'log':
      log(e.data.data);
      break;
    default:
    // nothing
  }
});
