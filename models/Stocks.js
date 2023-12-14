module.exports = (sequelize, DataTypes) => {
  const Stocks = sequelize.define("Stocks", {
    assetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetSerialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetCapacity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetCondition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Stocks;
};
