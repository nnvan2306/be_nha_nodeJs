import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";
const { Op } = require("sequelize");
import ticketService from "./ticketService";

const crateCalendarService = async (data) => {
    try {
        await db.Calendar.create({
            hostId: data.hostId,
            guestId: data.guestId,
            date: data.date,
            hour: data.hour,
        });

        return funcReturn("create calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getCalendarService = async (data) => {
    try {
        let calendars;

        if (!data.hostId && !data.guestId) {
            calendars = [];
        } else if (!data.hostId) {
            calendars = await db.Calendar.findAll({
                where: {
                    [Op.or]: [
                        { hostId: data.guestId },
                        { guestId: data.guestId },
                    ],
                },
            });
        } else if (!data.guestId) {
            calendars = await db.Calendar.findAll({
                where: {
                    [Op.or]: [
                        { hostId: data.hostId },
                        { guestId: data.hostId },
                    ],
                },
            });
        } else {
            calendars = await db.Calendar.findAll({
                where: {
                    [Op.or]: [
                        { hostId: data.hostId, guestId: data.guestId },
                        { hostId: data.guestId, guestId: data.hostId },
                    ],
                },
            });
        }

        console.log(calendars);

        return funcReturn("calendars", 0, calendars);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteCalendarService = async (id) => {
    try {
        if (!id) {
            return funcReturn("id mustn't empty !", 1, []);
        }

        await db.Calendar.destroy({
            where: { id: id },
        });
        return funcReturn("delete calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateCalendarService = async (data) => {
    try {
        await db.Calendar.update(
            {
                hostId: data.hostId,
                guestId: data.guestId,
                date: data.date,
                hour: data.hour,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update calendar successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    crateCalendarService,
    getCalendarService,
    deleteCalendarService,
    updateCalendarService,
};
