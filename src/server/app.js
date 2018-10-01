//Imports
let express = require('express');
let mongoose      = require  ('mongoose') ;
let bodyParser    = require  ('body-parser') ;
let cors          = require  ('cors') ;
let corsOptions   = require  ('./config/cors') ;
let config        = require  ('./config/config') ;
let chat_routes   = require  ('./routes/chat_routes') ;
let path = require('path');
let https = require('https');
let intel = require('intel');
let fs = require('fs');
let morgan =  require('morgan');
let app = express();

app.options('*', cors(corsOptions));

/* логгирование */
intel.addHandler(new intel.handlers.File('./logs/file.log'));
/* логгирование */


const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});
// *** config middleware *** //
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.raw({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[clf] :http-version', {stream: accessLogStream}));




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
