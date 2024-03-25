import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import calendarService from "../service/calendarService";

const handleCreateCalendar = async (req, res) => {
    try {
        let data = req.body;
        if (!data.hostId || !data.guestId || !data.date || !data.hour) {
            return res.status(400).json(returnInfoEmpty());
        }
        if (data.guestId === data.hostId) {
            return res
                .status(404)
                .json(funcReturn("hostId and guestId muestn't equal", 1, []));
        }
        let dataBuider = {
            ...data,
            hostId: +data.hostId,
            guestId: +data.guestId,
        };
        let fetch = await calendarService.crateCalendarService(dataBuider);

        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleGetCalendar = async (req, res) => {
    try {
        let dataBuider = {
            hostId: req.query.hostId,
            guestId: req.query.guestId,
        };

        let fetch = await calendarService.getCalendarService(dataBuider);

        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleDeleteCalendar = async (req, res) => {
    try {
        let fetch = await calendarService.deleteCalendarService(+req.query.id);
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

const handleUpdateCalendar = async (req, res) => {
    try {
        let data = req.body;
        if (
            !data.id ||
            !data.hostId ||
            !data.guestId ||
            !data.date ||
            !data.hour
        ) {
            return res.status(400).json(returnInfoEmpty());
        }

        let dataBuider = {
            ...data,
            hostId: +data.hostId,
            guestId: +data.guestId,
        };

        let fetch = await calendarService.updateCalendarService(dataBuider);

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
    handleCreateCalendar,
    handleGetCalendar,
    handleDeleteCalendar,
    handleUpdateCalendar,
};
