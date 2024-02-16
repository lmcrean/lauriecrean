const serve = require('serve');
const path = require('path');

const server = serve(path.join(__dirname, 'build'), {
  port: process.env.PORT || 3000,
  ignore: ['node_modules']
});

console.log(`Server listening on port ${server.options.port}`);
