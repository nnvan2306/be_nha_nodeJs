"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Chair extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Chair.hasMany(models.Statistic);
            Chair.belongsTo(models.Team);
        }
    }

    Chair.init(
        {
            numberChair: DataTypes.INTEGER,
            locationId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Chair",
        }
    );
    return Chair;
};
