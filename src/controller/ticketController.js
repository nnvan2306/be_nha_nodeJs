import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import ticketService from "../service/ticketService";

const handleCreateTicket = async (req, res) => {
    try {
        let fetch = await ticketService.createTicketService(+req.body.id);
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
        let fetch = ticketService.updateTicketService(+req.body.id);

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
    handleDeleteTicket,
    handleGetTicket,
    handleGetTicketNotBooking,
};
