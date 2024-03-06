import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import {
    createStatisticService,
    deleteStatisticService,
    getStatisticPlayerService,
    updateStatisticService,
} from "../service/statisticService";

export const handleGetStatisticPlayer = async (req, res) => {
    try {
        if (req.query.id) {
            let fetch = await getStatisticPlayerService(req.query.id);

            return res.status(fetch.errorCode === 0 ? 200 : 500).json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const handleCreateStatistic = async (req, res) => {
    try {
        if (!req.body.seasonId || !req.body.playerId || !req.body.seasonName) {
            return res.status(400).json(returnInfoEmpty());
        }

        let dataBuider = { ...req.body, seasonId: +req.body.seasonId };
        let fetch = await createStatisticService(dataBuider);
        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 401 : 500
            )
            .json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const handleUpdateStatistic = async (req, res) => {
    try {
        if (
            !req.body.seasonId ||
            !req.body.playerId ||
            !req.body.id ||
            !req.body.seasonName
        ) {
            return res.status(400).json(returnInfoEmpty());
        }

        let fetch = await updateStatisticService(req.body);

        return res.status(fetch.errorCode === 0 ? 200 : 500).json({
            message: fetch.message,
            errorCode: fetch.errorCode,
            data: fetch.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

export const deleteStatistic = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(400).json(returnInfoEmpty());
        }

        let fetch = await deleteStatisticService(req.query.id);

        return res
            .status(
                fetch.errorCode === 0 ? 200 : fetch.errorCode === 1 ? 401 : 500
            )
            .json({
                message: fetch.message,
                errorCode: fetch.errorCode,
                data: fetch.data,
            });
    } catch (err) {
        console.log(err);
    }
};
