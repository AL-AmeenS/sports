var express = require('express');
var router = express.Router();
const eventhelpers = require('../helpers/eventhelpers');
const multer=require('multer')
const uuid=require('uuid').v4
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('admin/homepage',{admin:true});
});
router.get('/addevents', function(req, res, next) {
  
    res.render('admin/addevent',{admin:true});
});
const storage =multer.diskStorage({
  destination:(req,file,cb)=>{
    const path=require('path')
    cb(null,path.join(__dirname,'../public/Event_images'));
  },
  filename:(req,file,cb)=>{
    const{originalname}=file;
    var imgid=`${uuid()}.jpg`
    cb(null,imgid);
  }
});
router.get('/viewevents', function(req, res, next) {
  eventhelpers.getallevents().then((event)=>{
    console.log(event[0])
    console.log(event[0].imagename)
    res.render('admin/viewevents',{admin:true,event});
  }) 
});
const upload=multer({storage})
router.post('/addevents',upload.single('filename'), function(req, res) {
  let eventobj={
    eventname:req.body.eventname,
    date:req.body.date,
    venue:req.body.venue,
    teamstrength:req.body.teamstrength,
    noparticipants:req.body.noparticipants,
    description:req.body.description,
    imagename:req.file.filename
}
console.log(eventobj)
  eventhelpers.addevents(eventobj).then((data)=>{
    res.render('admin/addevent',{admin:true});
  })
});
module.exports = router;
