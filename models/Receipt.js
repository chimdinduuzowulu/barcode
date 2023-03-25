module.exports = (sequelize, DataTypes) =>{
    const Receipt = sequelize.define('Receipt',{
        station: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        monthYear: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rv: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        head: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subhead: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amountWords: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        particulars: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        signature: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Receipt;
}