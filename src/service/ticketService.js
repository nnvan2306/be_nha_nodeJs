import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";

const createTicketService = async (id) => {
    try {
        for (let i = 0; i < 50; i++) {
            await db.Ticket.create({
                name: `${
                    i < 10
                        ? "A"
                        : i < 20
                        ? "B"
                        : i < 30
                        ? "C"
                        : i < 40
                        ? "D"
                        : "E"
                }${i + 1}`,
                isBooking: false,
                calendarId: id,
            });
        }

        return funcReturn("create tickets successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateTicketService = async (id) => {
    try {
        await db.Ticket.update(
            {
                isBooking: true,
            },
            {
                where: { id: id },
            }
        );

        return funcReturn("booking successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteTicketService = async (id) => {
    try {
        await db.Ticket.destroy({
            where: { id: id },
        });
        return funcReturn("delete ticket successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getTicketService = async (id) => {
    try {
        console.log(id);
        console.log(typeof id);
        let tickets = await db.Ticket.findAll({
            where: { calendarId: id },
        });

        return funcReturn("tickets", 0, tickets);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getTicketNoBookingService = async (id) => {
    try {
        let tickets = await db.Ticket.findAll({
            where: { calendarId: id, isBooking: false },
        });

        return funcReturn("tickets", 0, tickets);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createTicketService,
    updateTicketService,
    deleteTicketService,
    getTicketService,
    getTicketNoBookingService,
};
