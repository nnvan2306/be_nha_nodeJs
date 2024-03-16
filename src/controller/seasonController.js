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

        let createSeason = await seasonService.createSeasonService(season);

        return res
            .status(
                createSeason?.errorCode === 0
                    ? 200
                    : createSeason?.errorCode === 1
                    ? 400
                    : 500
            )
            .json({
                message: createSeason?.message,
                errorCode: createSeason?.errorCode,
                data: createSeason?.data,
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleGetLimitSeasons = async (req, res) => {
    try {
        let seasons;
        if (req.query.page && req.query.pageSize) {
            let page = req.query.page;
            let pageSize = req.query.pageSize;

            seasons = await seasonService.getSeasonLimitService(
                +page,
                +pageSize
            );
        } else {
            seasons = await seasonService.getAllSeasonsService();
        }
        return res.status(seasons.errorCode === 0 ? 200 : 500).json({
            message: seasons.message,
            errorCode: seasons.errorCode,
            data: seasons.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleDeleteSeason = async (req, res) => {
    try {
        let dele = await seasonService.deleteSeasonService(req.query.index);
        return res.status(dele.errorCode === 0 ? 200 : 500).json({
            message: dele.message,
            errorCode: dele.errorCode,
            data: dele.data,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

const handleUpdateSeason = async (req, res) => {
    try {
        let update = await seasonService.updateSeasonService(req.body);
        return res.status(update.errorCode === 0 ? 200 : 500).json({
            message: update.message,
            errorCode: update.errorCode,
            data: update.data,
        });
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
