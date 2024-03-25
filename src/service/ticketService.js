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

module.exports = { createTicketService };
