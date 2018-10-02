import express from 'express';

const app = express();
app.use(express.json());
const http = require('http').Server(app);
const cors = require('cors');
const ws = require('ws');
const wss = new ws.Server({ server: http })

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(data);
    }
  });
};

// allow CORS
app.use(cors());

app.get('*', function(req, res){
  res.send("hello world");
});

http.listen('1337', function(){
  console.log('Server running at http://127.0.0.1:1337/');
});
