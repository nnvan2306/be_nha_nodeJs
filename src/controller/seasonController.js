import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import seasonService from "../service/seasonService";

const handleCreateSeason = async (req, res) => {
    const season = req.body;
    // console.log(req.headers);
    // console.log(JSON.stringify(req));
    try {
        //validate

        if (
            !season.index ||
            !season.name ||
            !season.description ||
            !season.des_text
        ) {
            return res.status(400).json(returnInfoEmpty());
        }

        //create season

        let fetch = await seasonService.createSeasonService(season);

        return res
            .status(
                fetch?.errorCode === 0
                    ? 200
                    : fetch?.errorCode === 1
                    ? 400
                    : 500
            )
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleGetLimitSeasons = async (req, res) => {
    try {
        let fetch;
        if (req.query.page && req.query.pageSize) {
            let page = req.query.page;
            let pageSize = req.query.pageSize;

            fetch = await seasonService.getSeasonLimitService(+page, +pageSize);
        } else {
            fetch = await seasonService.getAllSeasonsService();
        }
        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleDeleteSeason = async (req, res) => {
    try {
        let fetch = await seasonService.deleteSeasonService(req.query.index);
        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleUpdateSeason = async (req, res) => {
    try {
        let fetch = await seasonService.updateSeasonService(req.body);
        return res
            .status(fetch.errorCode === 0 ? 200 : 500)
            .json(funcReturn(fetch.message, fetch.errorCode, fetch.data));
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

module.exports = {
    handleCreateSeason,
    handleGetLimitSeasons,
    handleDeleteSeason,
    handleUpdateSeason,
};
