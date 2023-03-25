const {Login} = require('../models');
var bcrypt = require('bcryptjs');
require('dotev').config();
// 
const hashPassword = (pass) =>{
    const salt = bcrypt.genSalt(10);
    var hash = (pass,salt);
    return hash;
}
const createLogin = async (req,res) =>{
    try {
        const {username, password} = req.body;
        const hashedPassword = hashPassword(password);
        const createDetails = await Login.create({
            username,
            hashedPassword,
        });
        createDetails ? res.status(200).json({message: 'login details created'}): res.status(401).json({message:"Login details not created"});
    } catch (error) {
        res.status(401).json({error: error});
        
    }
}
// 
const checkLogin = async (req,res)=>{
    try {
        const {username, password } = req.body;
        const findUser = await Login.findOne({
            where: {
                username: username,
            }
        });
        if(findUser=== null) {
            return res.status(400).json({message:"Incorrect username"});
        }
        const pass = await bcrypt.compare(password,findUser.password);
        pass ? res.status(200).json({message:"Login successful"}):res.status(400).json({message:"Incorrect password"});
    } catch (error) {
        res.status(4001).json({error: error});
        
    }
}
// 
const updateLogin = async (req,res)=> {
    try {
        const {username, password,oldPassword} = req.body;
        const checkusername = await Login.findOne({where:{username: username}});
        if(checkusername === null){
            return res.status(400).json({message: "Incorrect login details!!"});
        }
        const passcheck = await Login.compare(oldPassword, checkusername.password);
        if(passcheck){
            await Login.update(
                {
                    password:password 
                },
                { 
                    where: {

                    username: username,
                }, 
            }
            );
            return res.status(200).json({message:"Password updated successfully"});
        }
        return res.status(4001).json({message:"Password is incorrect"});
    } catch (error) {
        res.status(404).json({errorMessage: error});
    }
    
}

module.exports= {
    createLogin,
    checkLogin,
    updateLogin
}