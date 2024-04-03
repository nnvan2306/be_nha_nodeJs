import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import standService from "../service/stadiumService";

class standController {
    async handleCreateStand(req, res) {
        try {
            let stand = req.body;
            if (!stand.listName || !stand.stadiumId) {
                return res.status(404).json(returnInfoEmpty());
            }
            let dataBuider = {
                ...stand,
                stadiumId: +stand.stadiumId,
            };

            let fetch = await standService.createStandService(dataBuider);
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

    async handleDeleteStand(req, res) {
        try {
            if (!req.query.id) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await standService.deleteStandService(+req.query.id);
            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleGetStand(req, res) {
        try {
            let fetch = await standService.getStandService(
                +req.query.stadiumId
            );

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }

    async handleUpdateStand(req, res) {
        try {
            let stand = req.body;
            if (!stand.listName || !stand.stadiumId) {
                return res.status(404).json(returnInfoEmpty());
            }
            let dataBuider = {
                ...stand,
                stadiumId: +stand.stadiumId,
                id: +stand.id,
            };
            let fetch = await standService.updateStandService(dataBuider);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new standController();
