const express=require('express')
const router=express.Router()
const {getUser, updateUser, deleteUser} =require('../controllers/userController')
// const {protect}= require('../middleware/userMiddware')

router.get('/',getUser)
router.put('/Update/:id',updateUser)
router.delete('/deleteUser/:id',deleteUser)

// router.get('/me',protect,getMe)

module.exports=router