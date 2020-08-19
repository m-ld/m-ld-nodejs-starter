# **m-ld** Node.js Starter Project
Basic setup for Node.js using **m-ld** and Javascript.

To run:
1. `npm install`
1. `node index.js`

The `index.js` script runs an in-process MQTT server to which the **m-ld** clone
can connect. In any real scenario this would be a separate, horizontally-scaled
service. Similarly, any additional clones would run on separate processes,
embedded in some distributed app.