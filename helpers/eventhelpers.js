const async = require('hbs/lib/async')
var db=require('../config/connection')
var collection=require('../config/collectiion')
module.exports={
    addevents:(events) =>{
    return new Promise(async(resolve,reject)=>{
        await db.get().collection('events').insertOne(events).then((data)=>{
            resolve(data)
        })
    })
},

getallevents:() =>{
    return new Promise(async(resolve,reject)=>
    {   
        let event= await db.get().collection(collection.EVENT_COLLECTIONS).find().toArray()
        console.log(event)
       
    resolve(event)})
},
}