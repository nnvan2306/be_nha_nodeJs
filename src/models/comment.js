"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Comment.hasMany(models.Ticket);
            // Comment.belongsTo(models.Stadium);
            // Comment.belongsToMany(models.Team, {
            //     through: "Comment_Team",
            //     foreignKey: "CommentId",
            // });
        }
    }

    Comment.init(
        {
            content: DataTypes.STRING,
            like: DataTypes.INTEGER,
            disLike: DataTypes.INTEGER,
            matchId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Comment",
        }
    );
    return Comment;
};
