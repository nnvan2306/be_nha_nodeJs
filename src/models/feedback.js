"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Feedback.hasMany(models.Ticket);
            // Feedback.belongsTo(models.Stadium);
            // Feedback.belongsToMany(models.Team, {
            //     through: "Feedback_Team",
            //     foreignKey: "FeedbackId",
            // });
        }
    }

    Feedback.init(
        {
            content: DataTypes.STRING,
            like: DataTypes.INTEGER,
            disLike: DataTypes.INTEGER,
            commentId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Feedback",
        }
    );
    return Feedback;
};
