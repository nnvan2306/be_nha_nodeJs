import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import billService from "../service/billService";

class billController {
    async handleCreateBill(req, res) {
        try {
            if (!req.body.price || !req.body.uuid) {
                return res.status(404).json(returnInfoEmpty());
            }
            let dataBuider = { ...req.body, price: +req.body.price };
            let fetch = await billService.createBillService(dataBuider);
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

    async handleDeleteBill(req, res) {
        try {
            if (!req.query.uuid) {
                return res.status(404).json(returnInfoEmpty());
            }
            let fetch = await billService.deleteBillService(+req.query.uuid);
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

    // async handleGetBill(req, res) {
    //     try {
    //         let bills;

    //         if (!req.body.page || !req.body.pageSize) {
    //             bills = await billService.getAllBillService();
    //         } else {
    //             bills = await billService.getLimitBillService(
    //                 +req.body.page,
    //                 +req.body.pageSize
    //             );
    //         }

    //         return res
    //             .status(
    //                 fetch.errorCode === 0
    //                     ? 200
    //                     : fetch.errorCode === 1
    //                     ? 400
    //                     : 500
    //             )
    //             .json(funcReturn(bills.message, bills.errorCode, bills.data));
    //     } catch (err) {
    //         console.log(err);
    //         return res.status(500).json(returnErrService());
    //     }
    // }
}

module.exports = new billController();
