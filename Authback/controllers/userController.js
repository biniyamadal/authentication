// controllers/userController.js
const User = require("../models/User.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        });
        await newUser.save();
        return res.status(201).json({ status: true, message: 'Record registered' });
    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User is not registered' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }

        const token = jwt.sign({username:user.username }, process.env.KEY, { expiresIn: '5m' });
        res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
        return res.status(200).json({ status: true, message: 'Login successfully' });
    } catch (error) {
        console.error('Error in login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const forgotpasswordUser=async(req,res)=>{
    const {email} = req.body;
    try{
        const user= await User.findOne({email});
        if(!user) {
            return res.json({message:'user is not registered'});
        } 

      
const token = jwt.sign({ email: user.email },"somesecretssss", { expiresIn: '5m' });
const encodedToken = encodeURIComponent(token).replace(/\./g,"%2E")
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'www.biniadal44@gmail.com',
    pass: 'qemj wxwq jxbe jaoe'
  }
});

var mailOptions = {
  from: 'www.biniadal44@gmail.com',
  to: email,
  subject: 'Reset password',
  text: `http://localhost:5173/resetpassword/${encodedToken}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return res.json({message:'Error sending email'})
  } else {
   return res.json({status:true, message:'Email sent'})
  }
}); 
    }
    catch(err) {
        console.log(err)
    }

}

const resetpasswordUser = async(req,res)=>{
    const {token} = req.params;
    const{password} = req.body;

    try{
        const decoded = await jwt.verify(token,process.env.KEY);
        const id = decoded.id;
        const hashPassword = await bcrypt.hash(password,10)
        await User.findByIdAndUpdate({_id:id},{password:hashPassword})
        return res.json({status:true,message:"updated password"})
    } catch(err) {
        return res.json("invalid token")
    }

}

module.exports = {
    signupUser,
    loginUser,
    forgotpasswordUser,
    resetpasswordUser
};
