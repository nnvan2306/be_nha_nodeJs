import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import { handleRemoveMatch } from "../middleware/removeImage";
import db from "../models/index";
import matchTeamService from "./matchTeamService";

const handleCheckExits = async (info) => {
    let match = await db.Match.findOne({
        where: {
            hostId: info.hostId,
            guestId: info.guestId,
            seasonId: info.seasonId,
        },
    });
    return match;
};

const handleGetMatchById = async (id) => {
    let match = await db.Match.findOne({
        where: { id: id },
    });
    return match;
};

const handleGetOneMatch = async (data) => {
    const match = await db.Match.findOne({
        where: {
            seasonId: data.seasonId,
            hostId: data.hostId,
            guestId: data.guestId,
        },
    });
    return match;
};

const createMatchService = async (data) => {
    try {
        let checkExits = await handleCheckExits(data);
        if (checkExits) {
            return funcReturn("Match is exits !", 1, []);
        }

        await db.Match.create({
            title: data.title,
            meta: data.meta,
            match_url: `/videos/${data.match_url}`,
            date: data.date,
            hour: data.hour,
            hostGoal: data.hostGoal,
            guestGoal: data.guestGoal,
            hostId: data.hostId,
            guestId: data.guestId,
            seasonId: data.seasonId,
        });

        let match = await handleGetOneMatch(data);

        await matchTeamService.createMatchTeamService(
            match?.dataValues,
            "hostId"
        );
        await matchTeamService.createMatchTeamService(
            match?.dataValues,
            "guestId"
        );

        return funcReturn("create match successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllMatchService = async () => {
    try {
        let matchs = await db.Match.findAll({
            include: {
                model: db.Team,
            },
        });

        return funcReturn("matchs", 0, matchs);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getMatchDetailSeasonService = async (page, pageSize, q) => {
    try {
        let matchs = await db.Match.findAll({
            where: {
                seasonId: q,
            },
            // offset: (page - 1) * pageSize,
            // limit: pageSize,

            include: [
                {
                    model: db.Team,
                    attributes: ["id", "name", "logo_url"],
                },
            ],
        });

        let start = (page - 1) * pageSize;
        let end = start + pageSize;

        let items = matchs.filter(
            (item, index) => index >= start && index <= end
        );

        let data = {
            items: items,
            meta: {
                currentPage: page,
                totalIteams: matchs.length,
                totalPages: Math.ceil(matchs.length / pageSize),
            },
        };
        return funcReturn("matchs", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteMatchService = async (id) => {
    try {
        let check = await handleGetMatchById(id);
        if (check) {
            let path = check.match_url.split("/videos/")[1];
            if (handleRemoveMatch(path)) {
                await db.Match.destroy({
                    where: { id: id },
                });

                await db.Match_Team.destroy({
                    where: { matchId: id },
                });
            } else {
                returnErrService();
            }
        } else {
            return funcReturn("match is don't exits !", 1, []);
        }

        return funcReturn("delete Match successfully", 0, []);
    } catch (err) {
        console.log(err);
        returnErrService();
    }
};

const updateMatchService = async (data) => {
    try {
        let match = await handleGetMatchById(data.id);

        if (data.isChangeFile.toLowerCase() === "true") {
            let path = data.match_url.split("/videos/")[1];
            if (handleRemoveMatch(path)) {
                await db.Match.update(
                    {
                        title: data.title,
                        meta: data.meta,
                        date: data.date,
                        hour: data.hour,
                        hostId: data.hostId,
                        guestId: data.guestId,
                        seasonId: data.seasonId,
                        match_url: `/videos/${data.match}`,
                    },
                    { where: { id: data.id } }
                );
            } else {
                return returnErrService();
            }
        } else {
            await db.Match.update(
                {
                    title: data.title,
                    meta: data.meta,
                    date: data.date,
                    hour: data.hour,
                    hostId: data.hostId,
                    guestId: data.guestId,
                    seasonId: data.seasonId,
                },
                { where: { id: data.id } }
            );
        }

        if (match.hostId !== data.hostId) {
            await matchTeamService.updateMatchTeamService(
                data.id,
                match.hostId,
                data.hostId
            );
        } else if (match.guestId !== data.guestId) {
            await matchTeamService.updateMatchTeamService(
                data.id,
                match.guestId,
                data.guestId
            );
        }

        return funcReturn("update match successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    getMatchDetailSeasonService,
    getAllMatchService,
    createMatchService,
    deleteMatchService,
    updateMatchService,
};
