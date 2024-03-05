const UserModel = require("../models/users")

const getUser=(req,res)=>{
        UserModel.find({})
        .then(users=>res.json(users))
        .catch(err=>res.json(err))
    }
const updateUser=(req,res)=>{
    const id = req.params.id;
    const updateUsrer= UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.uname, 
        email:req.body.uemail
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
// console.log("daa ",updateu)
}


const deleteUser=(req,res)=>{
    const id = req.params.id;
    const deleteduser=  UserModel.findByIdAndDelete({_id:id}) 
     .then(users=>res.json(users))
     .catch(err=>res.json(err))
    // console.log("the id in backend  ",id,deleteduser)

}
    module.exports={
        
        getUser,updateUser,deleteUser
    }