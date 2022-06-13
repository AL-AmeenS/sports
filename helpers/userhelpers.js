const async = require('hbs/lib/async')
var db=require('../config/connection')
var collection=require('../config/collectiion')
const bcrypt=require('bcrypt')
module.exports={
    storeuserinformation:(user) =>{
    return new Promise(async(resolve,reject)=>{
        user.password=await bcrypt.hash(user.password,10)
        user.confirmpassword=await bcrypt.hash(user.confirmpassword,10)
        await db.get().collection(collection.USER_COLLECTIONS).insertOne(user).then((data)=>{
            resolve(data)
        })
    })
},
dologin:(userdata) =>{
    console.log(userdata)
    return new Promise(async(resolve,reject)=>{
        let loginstatus=false
        let response={}
    let user=await db.get().collection(collection.USER_COLLECTIONS).findOne({email:userdata.email})
    if(user)
    { 
        bcrypt.compare(userdata.password,user.password).then((status)=>{
            if(status){
                console.log('login success')
                response.user=user
                response.status=true
                resolve(response)
            }
            else{
                console.log('login failed')
                resolve({status:false})
            }
        })
    }
    else{
        console.log('login failed')
    }
    })
},
}