"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Bill extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Bill.init(
        {
            price: DataTypes.INTEGER,
            totalTicket: DataTypes.INTEGER,
            uuid: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.INTEGER,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Bill",
        }
    );
    return Bill;
};
