const async = require('hbs/lib/async')
var db=require('../config/connection')
module.exports={
    addsubjects:() =>{
        return new Promise(async(resolve,reject)=>
        {   
            await db.get().collection('te').insertOne({ item: "card", qty: 15 })
            console.log("hi")
        resolve()})
    }
}