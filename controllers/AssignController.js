const { Assign, Stocks } = require("../models");
require("dotenv").config();

// create assest
const assignAsset = async (req, res) => {
  // ID
  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomPart = Math.random().toString(36).substr(2, 5); // Use part of the random string

    const uniqueId = `${timestamp}-${randomPart}`;
    return uniqueId;
  }

  const uniqueId = generateUniqueId();
  try {
    const {
      assetName,
      assetSerialNumber,
      asssetAssignedTo,
      dateAssigned,
      assetDefect,
      assignmentDescription,
    } = req.body;
    //
    const createDetails = await Assign.create({
      assetName,
      assetSerialNumber,
      asssetAssignedTo,
      dateAssigned,
      assetDefect,
      assignmentDescription,
      AssignedID: uniqueId,
    });
    if (createDetails) {
      const updateAsset = await Stocks.update(
        {
          assignedTo: asssetAssignedTo,
          assigned: true,
          assetDeffects: assetDefect,
          AssignedID: uniqueId,
        },
        {
          where: {
            assetSerialNumber: assetSerialNumber,
          },
        }
      );

      updateAsset
        ? res.status(200).json({ message: "Asset assigned successfuly" })
        : res
            .status(301)
            .json({ message: "Asset assignment and update not succesfull" });
    } else {
      res.status(401).json({ message: "Asset assignment not succesfull" });
    }
  } catch (error) {
    res.status(501).json({ message: error });
  }
};
// get asset
const getAsigned = async (req, res) => {
  const { id } = req.params;
  try {
    const getDetails = await Assign.findOne({
      where: { id: id },
    });
    if (getDetails === null) {
      return res
        .status(401)
        .json({ message: "Error fetching data", data: getDetails });
    }
    return res
      .status(200)
      .json({ message: "Asigned Asset Found", data: getDetails });
  } catch (error) {
    res.status(501).json({ message: "Server error", error: error });
  }
};
// get all assets
const getAllAssigned = async (req, res) => {
  try {
    const getAllAssigned = await Assign.findAll({
      order: [["id", "DESC"]],
    });

    if (getAllAssigned === null || getAllAssigned.length === 0) {
      return res.status(200).json({ message: "No data", data: getAllAssigned });
    }
    return res
      .status(200)
      .json({ message: "Data fetched", data: getAllAssigned });
  } catch (error) {
    res.status(501).json({ errorMessage: error });
  }
};
//update asset
const updateAssigned = async (req, res) => {
  const { id } = req.params;
  try {
    const {
      assetName,
      assetSerialNumber,
      asssetAssignedTo,
      dateAssigned,
      assetDefect,
      assignmentDescription,
    } = req.body;

    const updateAssignedAsset = await Assign.update(
      {
        assetName,
        assetSerialNumber,
        asssetAssignedTo,
        dateAssigned,
        assetDefect,
        assignmentDescription,
      },
      {
        where: {
          id: id,
        },
      }
    );
    updateAssignedAsset
      ? res.status(200).json({ message: "Asset Assigned successfully" })
      : res.status(401).json({ message: "Asset Assignement failed" });
    return;

    //
  } catch (error) {
    console.log(error);
    res.status(501).json({ error, message: "Internal server error!" });
  }
};

// Delete Asset
const deleteAssigned = async (req, res) => {
  const { AssignedID } = req.params;
  try {
    const deleteAssigned = await Assign.destroy({
      where: {
        AssignedID,
      },
    });
    deleteAssigned
      ? res.status(200).json({ message: "Assigned Asset deleted successfully" })
      : res.status(401).json({ message: "Assigned Asset deletion failed" });
    return;

    //
  } catch (error) {
    console.log(error);
    res.status(501).json({ error, message: "Internal server error!" });
  }
};

module.exports = {
  assignAsset,
  getAsigned,
  getAllAssigned,
  updateAssigned,
  deleteAssigned,
};
