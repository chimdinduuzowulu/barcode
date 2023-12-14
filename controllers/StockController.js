const { Stocks } = require("../models");
require("dotenv").config();

// create assest
const createAsset = async (req, res) => {
  try {
    const {
      assetName,
      assetModel,
      assetColor,
      assetSerialNumber,
      assetCapacity,
      assetType,
      assetCondition,
      assetDescription,
    } = req.body;
    //
    const createAssetDetails = await Stocks.create({
      assetName,
      assetModel,
      assetColor,
      assetSerialNumber,
      assetCapacity,
      assetType,
      assetCondition,
      assetDescription,
    });

    createAssetDetails
      ? res.status(200).json({ message: "Asset created successfuly" })
      : res.status(401).json({ message: "Asset details not created" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
// get asset
const getAsset = async (req, res) => {
  const id = req.params.body;
  try {
    const getDetails = await Stocks.findOne({
      where: { id: id },
    });
    if (getDetails === null) {
      return res
        .status(401)
        .json({ message: "Error fetching data", data: getDetails });
    }
    return res.status(200).json({ message: "Asset found", data: getDetails });
  } catch (error) {
    res.status(401).json({ message: "data error", error: error });
  }
};
// get all assets
const getAssets = async (req, res) => {
  try {
    const getllAssets = await Stocks.findAll({
      order: [["id", "DESC"]],
    });

    if (getllAssets === null || getllAssets.length === 0) {
      return res.status(200).json({ message: "No data", data: getllAssets });
    }
    return res.status(200).json({ message: "Data fetched", data: getllAssets });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
};
//update asset
const updateAsset = async (req, res) => {
  const id = req.params.body;
  try {
    const {
      assetName,
      assetModel,
      assetColor,
      assetSerialNumber,
      assetCapacity,
      assetType,
      assetCondition,
      assetDescription,
    } = req.body;

    const updateAsset = await Stocks.update(
      {
        assetName,
        assetModel,
        assetColor,
        assetSerialNumber,
        assetCapacity,
        assetType,
        assetCondition,
        assetDescription,
      },
      {
        where: {
          id: id,
        },
      }
    );
    updateAsset
      ? res.status(200).json({ message: "Asset updated successfully" })
      : res.status(401).json({ message: "Asset update failed" });
    return;

    //
  } catch (error) {
    console.log(error);
    res.status(501).json({ error, message: "Internal server error!" });
  }
};

// Delete Asset
const deleteAsset = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteAsset = await Stocks.destroy({
      where: {
        id: id,
      },
    });
    deleteAsset
      ? res.status(200).json({ message: "Asset deleted successfully" })
      : res.status(401).json({ message: "Asset deletion failed" });
    return;

    //
  } catch (error) {
    console.log(error);
    res.status(501).json({ error, message: "Internal server error!" });
  }
};

module.exports = {
  createAsset,
  getAsset,
  getAssets,
  updateAsset,
  deleteAsset,
};
