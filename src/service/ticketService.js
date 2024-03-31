import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";

// const createTicketService = async (id) => {
//     try {
//         for (let i = 0; i < 50; i++) {
//             await db.Ticket.create({
//                 name: `${
//                     i < 10
//                         ? "A"
//                         : i < 20
//                         ? "B"
//                         : i < 30
//                         ? "C"
//                         : i < 40
//                         ? "D"
//                         : "E"
//                 }${i + 1}`,
//                 isBooking: false,
//                 calendarId: id,
//             });
//         }

//         return funcReturn("create tickets successfully", 0, []);
//     } catch (err) {
//         console.log(err);
//         return returnErrService();
//     }
// };

const handleCheckExits = async (name, firstIndex, lastIndex) => {
    for (let i = firstIndex; i <= lastIndex; i++) {
        let ticket = await db.Ticket.findOne({
            where: { name: `${name}${i}`, calendarId: id },
        });
        if (ticket) {
            return ticket;
        }
    }
    return false;
};

const createTicketService = async (data) => {
    try {
        let check = await handleCheckExits(
            data.name,
            data.firstIndex,
            data.lastIndex,
            data.calendarId
        );
        if (check) {
            return funcReturn(`${ticket.name} is exits`, 1, []);
        }

        for (let i = firstIndex; i <= lastIndex; i++) {
            await db.Ticket.create({
                name: `${data.name}${i}`,
                price: data.price,
                isVip: data.isVip,
                isBooking: false,
                calendarId: data.calendarId,
            });
        }

        return funcReturn("create tickets successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateTicketService = async (data) => {
    try {
        let ticket = await db.Ticket.findOne({
            where: { id: data.id },
        });
        if (!ticket) {
            return funcReturn("ticket don't exits", 1, []);
        }

        await db.Ticket.update(
            {
                name: data.name,
                isVip: data.isVip,
                price: data.price,
                isBooking: data.isBooking,
                calendarId: ticket.calendarId,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("booking successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateBookingTicketService = async (id) => {
    try {
        let ticket = await db.Ticket.findOne({
            where: { id: id },
        });
        if (!ticket) {
            return funcReturn("ticket don't exits", 1, []);
        }

        await db.Ticket.update(
            {
                isBooking: ticket.isBooking ? false : true,
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
    updateBookingTicketService,
    deleteTicketService,
    getTicketService,
    getTicketNoBookingService,
};
