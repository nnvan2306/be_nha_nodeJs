import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";

const createBillService = async (data) => {
    try {
        await db.Bill.create({
            price: data.price,
            uuid: data.uuid,
        });

        return funcReturn("create bill success", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteBillService = async (uuid) => {
    try {
        let bill = await db.Bill.findOne({
            where: {
                uuid: uuid,
            },
        });

        if (!bill) {
            return funcReturn("bill is not exits !", 1, []);
        }

        await db.Bill.destroy({
            where: { uuid: uuid },
        });

        return funcReturn("delete Bill successfully", 0, []);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllBillService = async () => {
    try {
        let bills = await db.Bill.findAll();
        return funcReturn("all bill", 0, bills);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitBillService = async (page, pageSize) => {
    try {
        let offset = (page - 1) * pageSize;
        let { count, rows } = await db.Bill.findAndCountAll({
            offset: offset,
            limit: pageSize,
        });
        let data = {
            items: rows,
            meta: {
                currentPage: page,
                totalIteams: count,
                totalPages: Math.ceil(count / pageSize),
            },
        };

        return funcReturn("bills", 0, data);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createBillService,
    deleteBillService,
    getAllBillService,
    getLimitBillService,
};
