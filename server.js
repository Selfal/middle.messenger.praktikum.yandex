const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (request, response) => {
  response.sendFile('index.html', { root: __dirname + '/dist' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
