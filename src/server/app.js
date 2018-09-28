//Imports
let express = require('express');
let mongoose      = require  ('mongoose') ;
let bodyParser    = require  ('body-parser') ;
let cors          = require  ('cors') ;
let corsOptions   = require  ('./config/cors') ;
let config        = require  ('./config/config') ;
let chat_routes   = require  ('./routes/chat_routes') ;

let app = express();

app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Privet');
});


app.get('/', (req, res) => {});
app.post('/', (req, res) => {});


mongoose.connect(config.db.database, (err, res) => {
  if(err) {
    console.log('Database error: ' + err);

  } else {
    console.log('Connected to database ' + config.db.database);


  }

});

const server = app.listen(config.serverPort, () => {
  console.log('Server is up and running on port ' + config.serverPort);
});

app.use('/api',  chat_routes);
module.exports = server;
