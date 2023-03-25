const {Receipt} = require('../models');
require('dotev').config();

const createReceipt = async (req,res) =>{
    try {
        const {
            station, 
            monthYear,
            rv,
            payer,
            address,
            head,
            subhead,
            description,
            amount,
            amountWords,
            particulars,
            date,
            signature,
        } = req.body;
        // 
        const createReceiptDetails = await Receipt.create({
            station, 
            monthYear,
            rv,
            payer,
            address,
            head,
            subhead,
            description,
            amount,
            amountWords,
            particulars,
            date,
            signature,
        });
        createReceiptDetails ? res.status(200).json({message: 'Receipt created successfuly'}): res.status(401).json({message:"Receipt details not created"});
    } catch (error) {
        res.status(401).json({error: error});
        
    }
}
// 
const getReceipt = async (req,res)=>{
    try {
        const id = req.params.receiptId;
        const getDetails = await Receipt.findOne({
            where:{ id: id}
        });
        if(getDetails === null) {
            return res.status(401).json({message:"Error fetching data", data: getDetails});
        }
        return res.status(200).json({message:"data fetched", data: getDetails});
    } catch (error) {
        res.status(401).json({message:"data error", error: error});
        
    }
}
// 
const getReceipts = async (req,res)=> {
    try {
        const getllReceipts = await Receipt.findAll();

        if( getllReceipts === null ){
            return res.status(401).json( {message: "No data fetched",data:getllReceipts } );
        }
        return res.status(200).json( { message:"Data fetced", data:getllReceipts } );

    } catch (error) {
        res.status(404).json({errorMessage: error});
    }
    
}

module.exports= {
    createReceipt,
    getReceipt,
    getReceipts
}