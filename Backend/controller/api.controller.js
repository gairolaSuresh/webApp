const Admin = require('../models/admin.model');
const Application = require('../models/application.model');
const bcrypt = require("bcrypt");


const apiController = {};

apiController.getAdminStatus = async (req, res, next) => {
    try {
        Admin.findOne({}).then((admin) => {
            if (admin) {
                res.status(200).json({ success: true, exist: true, msg: 'admin exist' });
            } else {
                res.status(200).json({ success: true, exist: false, msg: 'admin not exist' });
            }
        }).catch((error) => {
            res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in admin catch' });
        });
    } catch (error) {
        res.status(200).json({ success: false, msg: 'Something went wrong!', type: 'in main catch' });
    }
};

/**
 * admin signUp
 * @param {*} req
 * @param {*} res
 */
apiController.registeration = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        email = email.toLowerCase();
        let salt = await bcrypt.genSaltSync(10);
        const Password = await bcrypt.hashSync(password, salt);
        let admin = new Admin({
            username: username,
            email: email,
            password: Password,
        });
        admin.save()
            .then(async (save) => {
                res.status(200).json({
                    success: true,
                    msg: "You have successfully registered!",
                });
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in save catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};

/**
 * user login
 * @param {*} req
 * @param {*} res
 */
apiController.login = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.toLowerCase();
        await Admin.findOne({ email: email }).then(async (admin) => {
            if (admin) {
                await bcrypt
                    .compare(password, admin.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            res.status(200).json({
                                success: true,
                                msg: "You have login successfully!",
                            });
                        } else {
                            res.status(200).json({
                                success: false,
                                msg: "Your credentails could be wrong!",
                                type: "no password match",
                            });
                        }
                    })
            } else {
                res.status(200).json({
                    success: false,
                    msg: "Your credentails could be wrong!",
                    type: "no user found",
                });
            }
        });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};



apiController.saveApplication = async (req, res, next) => {
    try {
        const { name, email, dob } = req.body;
        let cv = '';
        if (req.files) {
            cv = req.files[0].filename;
        }
        let newApplication = new Application({
            name: name,
            email: email,
            dob: dob,
            CV: cv
        });
        newApplication.save().then(async (saved) => {
            res.status(200).json({
                success: true,
                msg: "Response Send Successfully!",
            });
        }).catch((error) => {
            res.status(200).json({
                success: false,
                msg: "Something went wrong!",
                type: "in saved catch",
                error: error
            });
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};

/**
 * get All Users
 * @param {*} req
 * @param {*} res
 */
apiController.getApplication = async (req, res, next) => {
    try {
        Application.find({})
            .then(async (allApplication) => {
                if (allApplication) {
                    res.status(200).json({
                        success: true,
                        msg: "Applicant Fetched Successfull!",
                        list: allApplication,
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "No Data Found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in allApplication catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


/**
 * get All Users
 * @param {*} req
 * @param {*} res
 */
apiController.changeApplicationStatus = async (req, res, next) => {
    try {
        const { Id, status } = req.query;
        Application.findByIdAndUpdate(Id, { status: status }, { new: true })
            .then(async (status) => {
                if (status) {
                    res.status(200).json({
                        success: true,
                        msg: "status changed",
                    });
                } else {
                    res.status(200).json({
                        success: false,
                        msg: "No Data Found!",
                    });
                }
            })
            .catch((error) => {
                res.status(200).json({
                    success: false,
                    msg: "Something went wrong!",
                    type: "in status catch",
                });
            });
    } catch (error) {
        res.status(200).json({
            success: false,
            msg: "Something went wrong!",
            type: "in main catch",
        });
    }
};


module.exports = apiController;