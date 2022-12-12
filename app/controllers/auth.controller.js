const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const mc_codes = db.mc_codes;
const mc_login = db.mc_login;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

/**
 * Function to signin finding and validating document and birthdate
 * @param {*} req 
 * @param {*} res 
 */
exports.signin = (req, res) => {
    User.findOne({
        where: {
            document: req.body.document
        }
    }).then(user => {

        //use Ip
        let ips = (
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress || ''
        ).split(',');

        //Begin Validator
        if (!user) {
            mc_login.create({
                idmask: req.body.document,
                type: 0,
                ip: ips[0].trim()
            })
            return res.status(404).send({ message: "User Not found." });
        }
        if (!(user.birthdate === req.body.birthdate)) {
            mc_login.create({
                idmask: user.idmask,
                type: 0,
                ip: ips[0].trim()
            })
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }
        //End Validators
        mc_login.create({
            idmask: user.idmask,
            type: 1,
            ip: ips[0].trim()
        })

        var token = jwt.sign({ idmask: user.idmask }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            idmask: user.idmask,
            document: user.document,
            birthdate: user.birthdate,
            goal_amount_1: user.goal_amount_1,
            award_1: user.award_1,
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};

/**
 * Function to signin finding and validating a code hash
 * @param {*} req 
 * @param {*} res 
 */
exports.signinSHA = (req, res) => {
    mc_codes.findOne({
        where: {
            code_hash: req.body.code_hash
        }
    }).then(user => {

        //use Ip
        let ips = (
            req.headers['cf-connecting-ip'] ||
            req.headers['x-real-ip'] ||
            req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress || ''
        ).split(',');

        //Begin Validator
        if (!user) {
            mc_login.create({
                idmask: req.body.code_hash,
                type: 0,
                ip: ips[0].trim()
            })
            return res.status(404).send({ message: "User Not found." });
        }
        //End Validators
        mc_login.create({
            idmask: user.idmask,
            type: 2,
            ip: ips[0].trim()
        })

        var token = jwt.sign({ idmask: user.idmask }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            idmask: user.idmask,
            accessToken: token
        });

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
};
