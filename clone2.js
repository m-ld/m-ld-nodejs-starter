const MemDown = require('memdown');
const { clone, uuid } = require('@m-ld/m-ld');
const { MqttRemotes } = require('@m-ld/m-ld/dist/mqtt');
const config = {
  '@id': uuid(),
  '@domain': 'test.example.org',
  genesis: false, // This clone needs clone 1 to have started
  mqtt: { host: 'localhost', port: 1883 }
};

(async function () {
  const meld = await clone(new MemDown, MqttRemotes, config)
  meld.status.subscribe(status => console.log('clone 2', 'status is', status))

  meld.follow(async (update, state) => {
    console.log('clone 2', 'has update', update);
    const all = await state.read({ '@describe': '?id', '@where': { '@id': '?id' } })
    console.log('clone 2', 'has state', all)
  })

  await meld.write({ '@id': 'hw2', message: 'Hello World from clone 2!' })

  // ...
})();