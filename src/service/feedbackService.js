import db from "../models/index";
import returnErrService from "../helps/returnErrService";
import funcReturn from "../helps/funcReturn";
const { Op } = require("sequelize");

const createFeedbackService = async (data) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getAllFeedbackService = async () => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const getLimitFeedbackService = async (page, pageSize) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const deleteFeedbackService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateLikeFeedbackService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

const updateDisLikeFeedbackService = async (id) => {
    try {
    } catch (err) {
        console.log(err);
        return returnErrService();
    }
};

module.exports = {
    createFeedbackService,
    getAllFeedbackService,
    getLimitFeedbackService,
    deleteFeedbackService,
    updateLikeFeedbackService,
    updateDisLikeFeedbackService,
};
