import jwt from "jsonwebtoken";
require("dotenv").config();

const createJwt = (payload) => {
    let key = process.env.JWT_SECRET;
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

module.exports = {
    createJwt,
    verifyToken,
};
