import jwt from "jsonwebtoken";
import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import { arrPath } from "../helps/listPathNotCheck";
require("dotenv").config();

const createJwtAccess = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = jwt.sign(payload, key);
    return token;
};

const createJwtRefresh = (payload) => {
    let key = process.env.JWT_SERECT_REFRESH;
    let token = jwt.sign(payload, key);
    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decode;
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decode;
};

const verifyRefreshToken = (token) => {
    let key = process.env.JWT_SERECT_REFRESH;
    let decode;
    try {
        decode = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decode;
};

const handleCheckToken = (req, res, next) => {
    if (arrPath.includes(req.path)) return next();

    try {
        let token = req.headers.cookie;
        console.log("jwt ---------------------", req.headers);
        if (!token.includes("access_token")) {
            return res.status(401).json(funcReturn("token expired !", 1, []));
        } else {
            let access_token = token.split("access_token=")[1].split(";")[0];
            let info = verifyToken(access_token);

            if (info.role === "admin") {
                next();
            } else {
                return res
                    .status(404)
                    .json(funcReturn("account is not admin !", 1, []));
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService);
    }
};

module.exports = {
    createJwtAccess,
    createJwtRefresh,
    verifyToken,
    verifyRefreshToken,
    handleCheckToken,
    // checkRole,
};
