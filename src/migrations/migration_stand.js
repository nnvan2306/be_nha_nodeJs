"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Stands", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            isReady: {
                type: Sequelize.BOOLEAN,
            },
            name: {
                type: Sequelize.STRING,
            },
            priceDefault: {
                type: Sequelize.INTEGER,
            },
            totalTicketDefault: {
                type: Sequelize.INTEGER,
            },
            stadiumId: {
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
        // await queryInterface.dropTable("Stadiums");
    },
};
