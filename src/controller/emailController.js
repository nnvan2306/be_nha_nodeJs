import funcReturn from "../helps/funcReturn";
import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import emailService from "../service/emailService";

class emailController {
    async handleSendEmail(req, res) {
        try {
            if (!req.body.email) {
                return res.status(404).json(returnInfoEmpty());
            }

            let fetch = await emailService.sendEmailService(req.body.email);

            return res
                .status(fetch.errorCode === 0 ? 200 : 500)
                .json(funcReturn(fetch.messase, fetch.errorCode, fetch.data));
        } catch (err) {
            console.log(err);
            return res.status(500).json(returnErrService());
        }
    }
}

module.exports = new emailController();
