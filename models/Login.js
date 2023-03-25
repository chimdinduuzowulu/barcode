module.exports = (sequelize, DataTypes) =>{
    const Login = sequelize.define('Login',{
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Login;
}