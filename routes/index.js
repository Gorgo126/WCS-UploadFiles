var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

const upload = multer({ dest: 'tmp/', limits:{
  fileSize : 3 * 1024 * 1024,
  } 
  });


const nodemailer = require("nodemailer");

// Création de la méthode de transport de l'email 
var smtpTransport = nodemailer.createTransport({
    service:"Gmail",
    auth: {
        user: "gorgobox@gmail.com",
        pass: "***********"
    }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.get('/askForCookiesRecipe', function(req, res, next) {
  smtpTransport.sendMail({
    from: "Deer Wild  <deer@wild.com>", // Expediteur
    to: "contact@wild.com, contact@school.com", // Destinataires
    subject: "Coucou 2!", // Sujet
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
  }, (err, response) => {
    if(err){
        console.log(err);
    }else{

      res.render('index', { title: 'Mail' })
        console.log("Message sent: " + response);
    }
  });
});


router.post('/uploaddufichier', upload.array('monfichier'), function (req, res, next) {
  fs.rename(req.fileS.path, 'public/images/' + req.files.originalname, function(err){
    if (err) {
        res.send('problème durant le déplacement');
    } else {
        res.send('Fichier uploadé avec succès');
    }
  });
})


router.use(function (req, res, next) {
  console.log('Hello Super Middleware !');
  next();
});
router.get('/superMiddleware', (req, res, next) => {
  console.log('Hello MW')
  res.send("coucou c'est ca")
 next();
});


router.post('/monupload', upload.array('monfichier',3), function (req, res, next) {
  for(let i = 0; i < req.files.length; i++){
  fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function(err){
  if (err) {
  res.send('problème durant le déplacement');
  } 
  }
  )};
  res.send('Fichier uploadé avec succès');
  })



module.exports = router;
