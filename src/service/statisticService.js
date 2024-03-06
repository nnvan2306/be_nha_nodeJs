import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";

export const getStatisticPlayerService = async (id) => {
    try {
        let player = await db.Statistic.findAll({
            where: { playerId: id },
            include: {
                model: db.Season,
                attributes: ["index", "name"],
            },
        });

        return funcReturn("info player", 0, player);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const handleCheckSeasonExits = async (id) => {
    let statistic = await db.Statistic.findOne({
        where: { seasonId: id },
    });

    return statistic;
};

const handleCheckExits = async (id) => {
    let statistic = await db.Statistic.findOne({
        where: { id: id },
    });

    return statistic;
};

export const createStatisticService = async (data) => {
    console.log("create");
    try {
        let check = await handleCheckSeasonExits(data.seasonId);
        if (check) {
            return funcReturn("statistic is exits !", 1, []);
        }

        await db.Statistic.create({
            goal: data.goal,
            assist: data.assist,
            yellowCard: data.yellowCard,
            redCard: data.redCard,
            pA: data.pA,
            seasonName: data.seasonName,
            playerId: data.playerId,
            seasonId: data.seasonId,
        });

        return funcReturn("create Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export const updateStatisticService = async (data) => {
    try {
        await db.Statistic.update(
            {
                goal: data.goal,
                assist: data.assist,
                yellowCard: data.yellowCard,
                redCard: data.redCard,
                pA: data.pA,
                seasonName: data.seasonName,
                seasonId: data.seasonId,
                playerId: data.playerId,
            },
            {
                where: { id: data.id },
            }
        );

        return funcReturn("update Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

export const deleteStatisticService = async (id) => {
    try {
        console.log(id);
        let check = await handleCheckExits(id);
        if (!check) {
            return funcReturn("statistic is not exits !", 1, []);
        }

        await db.Statistic.destroy({
            where: { id: id },
        });

        return funcReturn("delete Statistic successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};
