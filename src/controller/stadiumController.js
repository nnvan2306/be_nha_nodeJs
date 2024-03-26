import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import stadiumService from "../service/stadiumService";

const handleCreateStadium = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(404).json(returnInfoEmpty());
        }

        let fetch = await stadiumService.createStadiumService(req.body);
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

const handleGetStadium = async (req, res) => {
    try {
        let fetch = await stadiumService.getStadiumService();
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

const handleDeleteStadium = async (req, res) => {
    try {
        let fetch = await stadiumService.deleteStadiumService(+req.query.id);
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

const handleUpdateStadium = async (req, res) => {
    try {
        if (!req.body.name || !req.body.id) {
            return res.status(404).json(returnInfoEmpty());
        }

        let dataBuider = {
            ...req.body,
            id: +req.body.id,
        };

        let fetch = await stadiumService.updateStadiumService(dataBuider);
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
    handleCreateStadium,
    handleGetStadium,
    handleDeleteStadium,
    handleUpdateStadium,
};
