import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";

const handleCheckExits = async (listName, stadiumId) => {
    listName.forEach(async (item) => {
        let stand = await db.Stand.findOne({
            where: { name: item, stadiumId: stadiumId },
        });
        if (stand) {
            return true;
        }
    });
    return false;
};

const createStandService = async (data) => {
    try {
        let stand = await handleCheckExits(data.name, data.stadiumId);
        if (stand) {
            return funcReturn(`stand ${data.name}  is exits !`, 1, []);
        }

        data.listName.forEach(async (item) => {
            await db.Stand.create({
                name: item,
                location: data.location,
                stadiumId: data.stadiumId,
            });
        });

        return funcReturn("create successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteStandService = async (id) => {
    try {
        await db.Stand.destroy({
            where: { id: id },
        });

        return funcReturn("delete successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = { createStandService, deleteStandService };
