'use strict';

const Hapi = require('@hapi/hapi');
const Routes = require('../src/routes');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  routes: {
    cors: true
  }
});

server.route(Routes);

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
