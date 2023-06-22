const { Receipt } = require('../models');
require('dotenv').config();

const createReceipt = async (req, res) => {
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
      Year: monthYear.slice(0, 4),
      signature: 'signature link here',
    });
    createReceiptDetails
      ? res.status(200).json({ message: 'Receipt created successfuly' })
      : res.status(401).json({ message: 'Receipt details not created' });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
//
const getReceipt = async (req, res) => {
  try {
    const monthYear = req.params.monthYear;
    console.log('monthYear= ', monthYear);
    const getDetails = await Receipt.findOne({
      where: { monthYear: monthYear },
    });
    if (getDetails === null) {
      return res
        .status(401)
        .json({ message: 'Error fetching data', data: getDetails });
    }
    return res.status(200).json({ message: 'data fetched', data: getDetails });
  } catch (error) {
    res.status(401).json({ message: 'data error', error: error });
  }
};
//
const getReceipts = async (req, res) => {
  try {
    const getllReceipts = await Receipt.findAll({
      limit: 12,
      order: [['id', 'DESC']],
    });

    if (getllReceipts === null || getllReceipts.length === 0) {
      return res.status(200).json({ message: 'No data', data: getllReceipts });
    }
    return res
      .status(200)
      .json({ message: 'Data fetched', data: getllReceipts });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
};
//
const getReceiptsByYear = async (req, res) => {
  const Year = req.params.Year;
  try {
    const getllReceipts = await Receipt.findAll({
      where: {
        Year: Year,
      },
      order: [['id', 'ASC']],
    });

    if (getllReceipts === null || getllReceipts.length === 0) {
      return res.status(200).json({ message: 'No data', data: getllReceipts });
    }
    return res
      .status(200)
      .json({ message: 'Data fetched', data: getllReceipts });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
};

module.exports = {
  createReceipt,
  getReceipt,
  getReceipts,
  getReceiptsByYear,
};
