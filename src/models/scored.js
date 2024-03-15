"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Scored extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Scored.init(
        {
            namePlayer: DataTypes.STRING,
            minuteGoal: DataTypes.INTEGER,
            isPenalty: DataTypes.BOOLEAN,
            matchId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Scored",
        }
    );
    return Scored;
};
