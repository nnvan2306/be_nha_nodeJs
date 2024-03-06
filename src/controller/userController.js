import returnErrService from "../helps/returnErrService";
import returnInfoEmpty from "../helps/returnInfoEmpty";
import userService from "../service/userService";

const handleValidateEmail = (email) => {
    var validate =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validate.test(email);
};
const handleRegister = async (req, res) => {
    const user = req.body;
    try {
        if (!user.email || !user.name || !user.password || !user.rePassword) {
            return res.status(400).json(returnInfoEmpty());
        }

        //validate email
        const validateEmail = handleValidateEmail(user.email);
        if (!validateEmail) {
            return res.status(401).json({
                message: "Invalid email",
                errorCode: 1,
                data: [],
            });
        }

        let register = await userService.registerService(user);

        return res
            .status(
                register.errorCode === 0
                    ? 200
                    : register.errorCode === 1
                    ? 400
                    : 500
            )
            .json({
                message: register.message,
                errorCode: register.errorCode,
                data: register.data,
            });
    } catch (err) {
        return res.status(500).json(returnErrService());
    }
};

const handleLogin = async (req, res) => {
    const user = req.body;
    try {
        //validate
        if (!user.email || !user.password) {
            return res.status(400).json(returnInfoEmpty());
        }
        //validate email
        const validateEmail = handleValidateEmail(user.email);
        if (!validateEmail) {
            return res.status(401).json({
                message: "Invalid email",
                errorCode: 1,
                data: [],
            });
        }
        let login = await userService.loginService(user);
        if (login.errorCode === 0) {
            res.cookie("jwt", login.data.access_token, {
                maxAge: 60 * 60 * 1000,
                httpOnly: true,
            });
        }
        return res
            .status(
                login.errorCode === 0 ? 200 : login.errorCode === 1 ? 400 : 500
            )
            .json({
                message: login.message,
                errorCode: login.errorCode,
                data: login.data,
            });
    } catch (err) {
        console.log(err);
        return res.status(500).json(returnErrService());
    }
};

module.exports = { handleRegister, handleLogin };
