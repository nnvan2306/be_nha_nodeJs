import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";

const createStadiumService = async (data) => {
    try {
        await db.Stadium.create({
            name: data.name,
        });

        return funcReturn("create stadium successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getStadiumService = async () => {
    try {
        let stadiums = await db.Stadium.findAll();
        return funcReturn("stadiums ", 0, stadiums);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteStadiumService = async (id) => {
    try {
        await db.Stadium.destroy({
            where: { id: id },
        });
        return funcReturn("delete stadium successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateStadiumService = async (data) => {
    try {
        await db.Stadium.update(
            {
                name: data.name,
            },
            { where: { id: data.id } }
        );

        return funcReturn("update successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createStadiumService,
    getStadiumService,
    deleteStadiumService,
    updateStadiumService,
};
