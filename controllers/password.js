const Sib=require('sib-api-v3-sdk');
require('dotenv').config();
const uuid=require('uuid');
const forgetpwdModel=require('../models/forgotpwdreq');
const userModel=require('../models/user');
const bcrypt=require('bcrypt');

exports.passwordresetmail=async(req, res, next)=>{
    try{
         const uId=uuid.v4();
        Sib.ApiClient.instance.authentications['api-key'].apiKey=process.env.SENDINBLUE_API_KEY ;
        const final=await new Sib.TransactionalEmailsApi().sendTransacEmail({
            'sender':{
                'email':'bhushubhamare@gmail.com','name':'Expense App'
            },
            'to':[{
                'email':`${req.body.email}`
            }],
            'subject':'Reset password of expense app',
            'textContent':`password reset link: http://localhost:3100/password/resetpassword/${uId}`
        })
        const user=await userModel.findOne({where:{email:req.body.email}});
        await forgetpwdModel.create({id:uId,userId:user.id});
        res.status(201).json({data:final,success:true});
    }
    catch(err){ 
        res.status(500).json({error:err,success:false});
    }   
}; 

exports.passwordreset=async(req, res, next)=>{
    try{
        const uId=req.params.uId;
        const link=await forgetpwdModel.findOne({where:{id:uId}});
        if(link.isActive){

           // link.isActive=false;
            res.status(201).json({success:true});
        }
        else{
                throw new Error('link already used');
        }
    }
    catch(err){
        res.status(500).json({error:err,success:false});
    }
};

exports.passwordupdate=async(req, res, next)=>{
    try{
        const email=req.body.email;
        const pass=req.body.password;
        const saltrounds=10;
        bcrypt.hash(pass,saltrounds,async(err,hash)=>{
            console.log(err);
            await userModel.update({password:hash},{where:{email:email}});
            res.status(201).json({message:'password updated successfully'});
        })
    }
    catch(err){
        res.status(500).json({error:err,success:false});
    }
};