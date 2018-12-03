//Imports
let express = require('express');
let app = express();
let mongoose      = require  ('mongoose') ;
let bodyParser    = require  ('body-parser') ;
let cors          = require  ('cors') ;
let corsOptions   = require  ('./config/cors') ;
let config        = require  ('./config/config.json') ;
let chat_routes   = require  ('./routes/chat_routes') ;
let path = require('path');
let intel = require('intel');
let fs = require('fs');
let morgan =  require('morgan');
let server = require('http').Server(app);
let cookieParser = require('cookie-parser');
// виносимо в окремий модуль
const io = require('socket.io')(server);
require('./socket_chat/socket_chat')(io);
app.options('*', cors(corsOptions));

/* логгирование */
intel.addHandler(new intel.handlers.File('./logs/file.log'));

/* логгирование */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});
// *** config middleware *** //
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.raw({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :date[clf] :http-version', {stream: accessLogStream}));
app.use(cookieParser());



app.get('/', (req, res) => {});
app.post('/', (req, res) => {});
app.use(express.static(path.join(__dirname, "/")));



mongoose.connect(config.db.database, { useNewUrlParser: true },(err, res) => {

  if(err) {
    console.log('Database error: ' + err);
  } else {

    console.log('Connected to database ' + config.db.database);
  }
});

mongoose.Promise = require('bluebird');
app.use('/api',  chat_routes);
server.listen(config.serverPort, () => console.log(`API running on localhost:${config.serverPort}`));

