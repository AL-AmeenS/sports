var express = require('express');
const async = require('hbs/lib/async');
const eventhelpers = require('../helpers/eventhelpers');
const userhelpers = require('../helpers/userhelpers');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  eventhelpers.getallevents().then((event)=>{
    console.log(event)
    res.render('user/home',{event});
  })
});
router.get('/userlogin', function(req, res, next) {
  res.render('user/userlogin');
});
router.get('/usersignup', function(req, res, next) {
  res.render('user/signup');
});
router.post('/usersignup', function(req, res) {
  
  userhelpers.storeuserinformation(req.body).then((data)=>{
    res.render('user/userlogin');
  })
  
  
});
router.post('/userlogin', function(req, res,) {
  userhelpers.dologin(req.body).then((result)=>{
         if(result.status){
          req.session.user=result.user
          req.session.user.loggedin=true
           res.redirect('/')
         }else{
           res.redirect('/userlogin')
         }
  })
   
 });

module.exports = router;
