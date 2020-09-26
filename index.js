const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883
const MemDown = require('memdown');
const { clone, uuid } = require('@m-ld/m-ld');
const { MqttRemotes } = require('@m-ld/m-ld/dist/mqtt');

const config = {
  '@id': uuid(),
  '@domain': 'test.example.org',
  '@context': require('./pair-ontology.json')['@context'],
  genesis: true,
  mqtt: { host: 'localhost', port }
};

server.listen(port, async () => {
  console.log('MQTT server started and listening on port ', port)

  const meld = await clone(new MemDown, MqttRemotes, config)
  console.log('m-ld status is', meld.status.value)

  //meld.follow().subscribe(console.log)

  await meld.transact(require('./organisations.json'));

  const addes = await meld.transact({
    '@describe': 'https://data.virtual-assembly.org/organizations/addes'
  });

  console.log(addes);

  // ...
})