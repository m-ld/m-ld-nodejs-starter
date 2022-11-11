const { MemoryLevel } = require('memory-level');
const { clone, uuid } = require('@m-ld/m-ld');
const { MqttRemotes } = require('@m-ld/m-ld/ext/mqtt');
const config = {
  '@id': uuid(),
  '@domain': 'test.example.org',
  genesis: true,
  mqtt: { host: 'localhost', port: 1883 }
};

(async function () {
  const meld = await clone(new MemoryLevel, MqttRemotes, config)
  meld.status.subscribe(status => console.log('clone 1', 'status is', status))

  process.send('started')

  meld.follow(async (update, state) => {
    console.log('clone 1', 'has update', update);
    const all = await state.read({ '@describe': '?id', '@where': { '@id': '?id' } })
    console.log('clone 1', 'has state', all)
  })

  await meld.write({ '@id': 'hw1', message: 'Hello World from clone 1!' })

  // ...
})();

