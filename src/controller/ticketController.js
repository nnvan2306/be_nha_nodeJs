import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import ticketService from "../service/ticketService";

// const handleCheckTypeName = (name) => {
//     if (
//         name.charCodeAt(0) < 65 ||
//         name.charCodeAt(0) > 90 ||
//         (name.charCodeAt(1) >= 65 && name.charCodeAt(1) <= 90)
//     ) {
//         return false;
//     }
//     return true;
// };

class TicketController {
    async handleCreateTicket(req, res) {
        try {
            let data = req.body;
            if (
                !data.listName ||
                !data.price ||
                !data.totalTicket ||
                !data.calendarId
            ) {
                return res.status(404).json(returnInfoEmpty());
            }

            //check type name

            let dataBuider = {
                ...data,
                totalTicket: +data.totalTicket,
                price: +data.price,
                calendarId: +data.calendarId,
            };
            let fetch = await ticketService.createTicketService(dataBuider);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateBookingTicket(req, res) {
        try {
            let dataBuider = {
                id: +req.body.id,
                totalTicketBooking: +req.body.totalTicketBooking,
            };

            let fetch = await ticketService.updateBookingTicketService(
                dataBuider
            );

            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteTicket(req, res) {
        try {
            let fetch = await ticketService.deleteTicketService(+req.query.id);
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetTicket(req, res) {
        try {
            let fetch = await ticketService.getTicketService(
                +req.query.calendarId
            );
            return res
                .status(
                    fetch.errorCode === 0
                        ? 200
                        : fetch.errorCode === 1
                        ? 400
                        : 500
                )
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteMultipleTicket(req, res) {
        try {
            if (req.body.listTicket.length === 0) {
                return res.status(200).json(funcReturn("delete", 0, []));
            }

            let fetch = await ticketService.deleteMultipleTicketService(
                req.body.listTicket
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleDeleteAllTicket(req, res) {
        try {
            let fetch = await ticketService.deleteAllTicketService(
                +req.query.calendarId
            );
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    // const handleUpdateTicket = async (req, res) => {
    //     try {
    //         let data = req.body;
    //         if (
    //             !data.name ||
    //             !data.firstIndex ||
    //             !data.lastIndex ||
    //             !data.price ||
    //             !data.calendarId
    //         ) {
    //             return res.status(404).json(returnInfoEmpty());
    //         }

    //         let checkName = handleCheckTypeName(data.name);
    //         if (!checkName) {
    //             return res
    //                 .status(404)
    //                 .json(funcReturn("Inappropriate name", 1, []));
    //         }

    //         let dataBuider = {
    //             ...data,
    //             id: +data.id,
    //             name: data.name.toUpperCase(),
    //             price: +data.price,
    //         };

    //         let fetch = await ticketService.updateTicketService(dataBuider);
    //         return res
    //             .status(fetch.errorCode === 0 ? 200 : 500)
    //             .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json(returnErrService());
    //     }
    // };
}

module.exports = new TicketController();
