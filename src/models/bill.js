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
            Bill.belongsTo(models.Ticket);
        }
    }

    Bill.init(
        {
            price: DataTypes.INTEGER,
            totalTicket: DataTypes.INTEGER,
            uuid: DataTypes.STRING,
            email: DataTypes.STRING,
            phoneNumber: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            country: DataTypes.STRING,
            isDelivered: DataTypes.BOOLEAN,
            ticketId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Bill",
        }
    );
    return Bill;
};
