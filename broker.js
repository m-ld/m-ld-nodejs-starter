const aedes = require('aedes')()
const server = require('net').createServer(aedes.handle)
const port = 1883

server.listen(port, () => {
  console.log('MQTT broker started and listening on port ', port)
  process.send('started')
});

aedes.on('client', client => {
  console.log('MQTT client connected', client.id)
});
