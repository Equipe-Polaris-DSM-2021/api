const app = require('./server');

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Polaris's API: Server Started at http://localhost:${port}`)
});

