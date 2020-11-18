# **m-ld** Node.js Starter Project
Basic setup for Node.js using **m-ld** and Javascript.

To run:
1. `npm install`
1. `node index.js`

The `index.js` script first runs an MQTT broker to which **m-ld** clones can
connect. In any real scenario this would be a separate, horizontally-scaled
service, and other options for peer-to-peer messaging are possible.

The script then runs two clones using the scripts `clone1.js` and `clone2.js`.
Clone one is the "genesis" clone and then clone two is the first replica (once
they are both started then they are equivalent). Both clones enter some data and
log the updates that they see and their final state.

You can change the data that is being written or the queries that are run to
experiment with different scenarios. Remember you can also use the **m-ld**
[playground](https://m-ld.org/playground/) to experiment with the API.