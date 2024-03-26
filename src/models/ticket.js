"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Ticket extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Ticket.belongsTo(models.Calendar);
        }
    }

    Ticket.init(
        {
            name: DataTypes.INTEGER,
            isBooking: DataTypes.BOOLEAN,
            calendarId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Ticket",
        }
    );
    return Ticket;
};
