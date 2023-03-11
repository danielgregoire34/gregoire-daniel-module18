const { connect, connection } = require('mongoose');

const connectionString =
process.env.MONGODB_URI || 'mongodb://localhost/gregoire-daniel-module18';

connect(connectionString, {
useFindAndModify: false,
useNewUrlParser: true,
useUnifiedTopology: true,
});

module.exports = connection;
