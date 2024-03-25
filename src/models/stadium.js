"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stadium extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Stadium.hasMany(models.Statistic);
        }
    }

    Stadium.init(
        {
            ticket: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Stadium",
        }
    );
    return Stadium;
};
