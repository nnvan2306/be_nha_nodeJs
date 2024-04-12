import returnErrService from "../helps/returnErrService";
import db from "../models/index";
import funcReturn from "../helps/funcReturn";
import { where } from "sequelize";

const createBillService = async (data) => {
    try {
        await db.Bill.create({
            price: data.price,
            content: data.content,
        });

        let bill = await db.Bill.findOne({
            where: {
                price: data.price,
                content: data.content,
            },
        });

        if (!bill) {
            return funcReturn("bill is not exits !", 1, []);
        }

        return funcReturn("bill", 0, bill);
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteBillService = async (id) => {
    try {
        let bill = await db.Bill.findOne({
            where: {
                id: id,
            },
        });

        if (!bill) {
            return funcReturn("bill is not exits !", 1, []);
        }

        await db.Bill.destroy({
            where: { id: id },
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
