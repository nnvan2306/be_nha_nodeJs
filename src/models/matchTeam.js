"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Match_Team extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    Match_Team.init(
        {
            matchId: DataTypes.INTEGER,
            teamId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match_Team",
        }
    );
    return Match_Team;
};
