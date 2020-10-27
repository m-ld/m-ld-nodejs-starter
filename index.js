const { fork } = require('child_process');

function started(childProcess) {
  return new Promise(resolve => childProcess.on('message', message => {
    if (message === 'started')
      resolve()
  }));
}

(async function () {
  await started(fork('broker.js'))
  await started(fork('clone1.js'))

  fork('clone2.js')
})();