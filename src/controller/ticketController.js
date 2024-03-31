import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import ticketService from "../service/ticketService";

// const handleCreateTicket = async (req, res) => {
//     try {
//         let fetch = await ticketService.createTicketService(+req.body.id);
//         return res
//             .status(fetch.errorCode === 0 ? 200 : 500)
//             .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(returnErrService());
//     }
// };

const handleCheckTypeName = (name) => {
    if (name.charCodeAt(0) < 65 || name.charCodeAt(0) > 90) {
        return false;
    }
    return true;
};

const handleCreateTicket = async (req, res) => {
    try {
        let data = req.body;
        if (
            !data.name ||
            !data.firstIndex ||
            !data.lastIndex ||
            !data.price ||
            !data.calendarId
        ) {
            return res.status(404).json(returnInfoEmpty());
        }

        //check type name
        let checkName = handleCheckTypeName(data.name);
        if (!checkName) {
            return res
                .status(404)
                .json(funcReturn("Inappropriate name", 1, []));
        }

        let dataBuider = {
            ...data,
            name: data.name.toUpperCase(),
            firstIndex: +data.firstIndex,
            lastIndex: +data.lastIndex,
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
};

const handleUpdateTicket = async (req, res) => {
    try {
        let data = req.body;
        if (
            !data.name ||
            !data.firstIndex ||
            !data.lastIndex ||
            !data.price ||
            !data.calendarId
        ) {
            return res.status(404).json(returnInfoEmpty());
        }

        let checkName = handleCheckTypeName(data.name);
        if (!checkName) {
            return res
                .status(404)
                .json(funcReturn("Inappropriate name", 1, []));
        }

        let dataBuider = {
            ...data,
            id: +data.id,
            name: data.name.toUpperCase(),
            price: +data.price,
        };

        let fetch = await ticketService.updateTicketService(dataBuider);
        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleUpdateBookingTicket = async (req, res) => {
    try {
        let fetch = await ticketService.updateBookingTicketService(
            +req.body.id
        );

        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 400 : 500
            )
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleDeleteTicket = async (req, res) => {
    try {
        let fetch = await ticketService.deleteTicketService(+req.query.id);
        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 400 : 500
            )
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleGetTicket = async (req, res) => {
    try {
        let fetch = await ticketService.getTicketService(+req.query.calendarId);
        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 400 : 500
            )
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleGetTicketNotBooking = async (req, res) => {
    try {
        let fetch = await ticketService.getTicketNoBookingService(
            +req.query.calendarId
        );
        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 400 : 500
            )
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

module.exports = {
    handleCreateTicket,
    handleUpdateTicket,
    handleUpdateBookingTicket,
    handleDeleteTicket,
    handleGetTicket,
    handleGetTicketNotBooking,
};
