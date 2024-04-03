import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";

const handleCheckExits = async (calendarId, listName) => {
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
            return funcReturn(`${check.name} is exits`, 1, []);
        }

        for (let i = data.firstIndex; i <= data.lastIndex; i++) {
            await db.Ticket.create({
                name: `${data.name}${i}`,
                price: data.price,
                isVip: data.isVip,
                totalTicket: data.totalTicket,
                calendarId: data.calendarId,
            });
        }

        return funcReturn("create tickets successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateBookingTicketService = async (data) => {
    try {
        let ticket = await db.Ticket.findOne({
            where: { id: data.id },
        });
        if (!ticket) {
            return funcReturn("ticket don't exits", 1, []);
        }

        await db.Ticket.update(
            {
                totalTicket: ticket.totalTicket - data.totalTicketBooking,
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

const deleteMultipleTicketService = async (arr) => {
    try {
        for (let i = 0; i < arr.length; i++) {
            await db.Ticket.destroy({
                where: { id: arr[i] },
            });
        }

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteAllTicketService = async (calendarId) => {
    try {
        await db.Ticket.destroy({
            where: {
                calendarId: calendarId,
            },
        });
        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

// const updateTicketService = async (data) => {
//     try {
//         let ticket = await db.Ticket.findOne({
//             where: { id: data.id },
//         });
//         if (!ticket) {
//             return funcReturn("ticket don't exits", 1, []);
//         }

//         await db.Ticket.update(
//             {
//                 name: data.name,
//                 isVip: data.isVip,
//                 price: data.price,
//                 isBooking: data.isBooking,
//                 calendarId: ticket.calendarId,
//             },
//             {
//                 where: { id: data.id },
//             }
//         );

//         return funcReturn("booking successfully", 0, []);
//     } catch (err) {
//         console.log(err);
//         return returnErrService();
//     }
// };

module.exports = {
    createTicketService,
    // updateTicketService,
    updateBookingTicketService,
    deleteTicketService,
    deleteMultipleTicketService,
    deleteAllTicketService,
    getTicketService,
    // getTicketNoBookingService,
};
