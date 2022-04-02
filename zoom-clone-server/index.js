import  express from 'express'
const app = express()
import http from 'http'
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

server.listen(3000, () => {
    console.log('Zoom clone API Listen on localhost: 3000')
});