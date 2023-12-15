module.exports = (sequelize, DataTypes) => {
  const Assign = sequelize.define("Assign", {
    assetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetSerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asssetAssignedTo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
    dateAssigned: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetDefect: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assignmentDescription: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    AssignedID: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    
  });
  return Assign;
};
