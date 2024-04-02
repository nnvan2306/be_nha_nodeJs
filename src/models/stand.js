"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Stand extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Calendar.belongsTo(models.Stadium);
        }
    }

    Stand.init(
        {
            isReady: DataTypes.BOOLEAN,
            name: DataTypes.STRING,
            stadiumId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Stand",
        }
    );
    return Stand;
};
