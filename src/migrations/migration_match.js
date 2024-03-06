"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Matches", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                type: Sequelize.STRING,
            },

            meta: {
                type: Sequelize.STRING,
            },
            date: {
                type: Sequelize.STRING,
            },
            hour: {
                type: Sequelize.STRING,
            },
            match_url: {
                type: Sequelize.STRING,
            },
            hostGoal: {
                type: Sequelize.INTEGER,
            },
            guestGoal: {
                type: Sequelize.INTEGER,
            },
            hostId: {
                type: Sequelize.INTEGER,
            },
            guestId: {
                type: Sequelize.INTEGER,
            },
            seasonId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Matches");
    },
};
