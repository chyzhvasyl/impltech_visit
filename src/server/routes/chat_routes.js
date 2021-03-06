let express = require('express');
let router = express.Router();
let user = require('../schems/user');
let file = require('../schems/file');
let _ =  require('lodash');
let passport = require('passport');
let jwt =  require('jsonwebtoken');
let {Strategy, ExtractJwt }=  require('passport-jwt');
let {jwt1} = require('../config/config.js');
let {authGmail} = require('../config/config.js');
let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
let path = require('path');
let multer = require('multer');
let UPLOAD_PATH = './uploads';
let FormData = require('form-data');
let fs = require('fs');




router.get('/history:/id',  check_auth, get_history);
router.post('/auth',   auth);
router.post('/logout',   logout);
router.post('/upload_file',   fileUpload);
router.post('/feedBackForm', feedBackForm);


router.get('/', (req, res) => {
  res.send('all good');
});

passport.use(new Strategy(jwt1, function(jwt_payload, done){
  if (jwt_payload !== void (0)){
    return done (false, jwt_payload);
  }
  done();
}));

function check_auth(req, res, next) {
passport.authenticate('jwt', {session: false}, (error, decryptToken, jwtError) => {
if (jwtError !== void(0) || error !== void(0)) {
  console.log(jwtError);
  return res.status(401).send('unauthorized ! ', error, jwtError)
}
  req.body = decryptToken;
  next()
})(req, res, next)
}

function create_token(body) {
  return jwt.sign(
    body,
    jwt1.secretOrKey,
    {expiresIn: jwt1.expiresIn}
  );
}

function  auth(req, res) {
  let userData = req.body;
  console.log('userData', userData);
  user.findOne({mail: {$regex: _.escapeRegExp(userData.mail), $options: 'i'}}).exec(function (error, user_data) {
    if (error)
    {
      res.send(error);
    }
    else {
      if (user_data == void(0)){
       let new_user = new user(userData);
        new_user.save(function (error, userdata) {
           if (error) {
             res.sendStatus(400).send(error);
           }
           else
             {
                let token =  create_token({id: userdata._id, username: userdata.username});
                res.cookie('token', token, {
                httpOnly: true
          });
               console.log('user added', userdata);
                res.status(201).send({user_id: userdata._id, message: 'user successfully added'} );
           }
         });
      }
      else {
        console.log('user founded');
        let token =  create_token({id: user_data._id, username: user_data.username});
        res.cookie('token', token, {
          httpOnly: true
        });
        //res.send(user_data);
        res.status(200).send({user_id: user_data._id, message: 'user loggedIn'} );
      }
    }
  })
}
function logout(req, res) {
  res.clearCookie('token');
  res.status(200).send({message: 'logged out successfully'});
}
function fileUpload(req, res) {
  uploadFile(req, res, function (err) {
    if (err) {
      res.send(err);
    } else {
        if (req.file || req.body.data) {
          let message = req.body.data;
          fs.readFile(req.file.path, 'utf-8', function (err, data) {
            if (err) throw err;
            let newFile = new file();
            newFile.filename = req.file.filename;
            newFile.contentType = req.file.mimetype;
            let filename = newFile.filename;
            newFile.save(function (err, newFile) {
              if (err) {
                res.sendStatus(400).send(err);
                res.json(err);
                intel.error(err);
              }
              else {
                // формуємо відправку на сєрвак
                let smtp_transport = nodemailer.createTransport(
                  smtpTransport({
                      service: "Gmail",
                      auth: authGmail
                    }
                  ));
                console.log('message.mail', message);
                let mail = {
                  from: '"Sender-Bot" <bot@impltech.com>',
                  to: "yurihoy1488@gmail.com", /* req.mail*/
                  subject: 'Potential Client:',
                  text:  'Почта потенциального клиента: ' + message,
                  attachments:
                    {
                      filename:  filename,
                      path: UPLOAD_PATH + '/' + filename.toString()
                    }
                };
                   smtp_transport.sendMail(mail, function(error, response){
                     if(error){
                       res.send(error);
                       console.log('error', error);
                       intel.error(error);
                     }else{
                       console.log('response', response);
                       res.send(response);
                     }
                     smtp_transport.close();
                   });
              }
            });
          });
        }
    }
  })
}
function feedBackForm(req, res){
  let message = req.body;
  console.log('message', message);
    let smtp_transport = nodemailer.createTransport(
      smtpTransport({
        service: "Gmail",
        auth: authGmail
      }
      ));
    let mail = {
      from: '"Sender-Form" <bot@impltech.com>',
      to: "yurihoy1488@gmail.com", /* req.mail*/
      subject: 'Potential Client:',
      text:  'Контакты_______ ' +'\n'+ 'Имя: ' + message.fullname +'\n'+'Почта: '  + message.mail + '\n' + 'Номер телефона: '
        + message.numberPhone + '\n' + 'Предмет: '  + message.subject +'\n' + 'Описание: '  + message.description
    };
      smtp_transport.sendMail(mail, function(error, response){
        if(error){
         // res.sendStatus(400);
          res.send(error);

        }else{
         // res.sendStatus(200);
          res.send(response);
        }
        smtp_transport.close();
      });
}

let storage = multer.diskStorage({
  destination: UPLOAD_PATH,
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
let uploadFile = multer({
  storage: storage,
  limits: {fileSize: 20 * 1024 * 1024},
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('graph');

function checkFileType(file, cb) {
  const filetypes = /.ppt|.txt|.doc|.docx|.pdf|.png|.jpeg/;
  const extname = path.extname(file.originalname).toLowerCase();
  const isValidExtension = filetypes.test(extname);
  if (isValidExtension) {
    return cb(null, true);
  } else {
    cb('Error: only .ppt|.txt|.doc|.docx|.pdf');
  }
}

function get_history(req, res) {

}

module.exports = router;
