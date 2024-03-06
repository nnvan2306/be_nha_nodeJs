"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Match extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Match.belongsToMany(models.Team, {
                through: "Match_Team",
                foreignKey: "matchId",
            });
        }
    }

    Match.init(
        {
            title: DataTypes.STRING,
            meta: DataTypes.STRING,
            match_url: DataTypes.STRING,
            date: DataTypes.STRING,
            hour: DataTypes.STRING,
            hostGoal: DataTypes.INTEGER,
            guestGoal: DataTypes.INTEGER,
            hostId: DataTypes.INTEGER,
            guestId: DataTypes.INTEGER,
            seasonId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Match",
        }
    );
    return Match;
};
