const client = require('./client');
const { rebuildDB } = require('./dbTables');

rebuildDB()
    .catch(console.error)
    .finally(() => client.end());