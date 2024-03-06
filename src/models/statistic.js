"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Statistic extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Statistic.belongsTo(models.Player);
            Statistic.belongsTo(models.Season);
        }
    }
    Statistic.init(
        {
            goal: DataTypes.INTEGER,
            assist: DataTypes.INTEGER,
            yellowCard: DataTypes.INTEGER,
            redCard: DataTypes.INTEGER,
            pA: DataTypes.INTEGER,
            seasonName: DataTypes.STRING,
            seasonId: DataTypes.INTEGER,
            playerId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Statistic",
        }
    );
    return Statistic;
};
