import db from "../models";
import config from "../config/auth.config";
const User = db.user;
const mc_tracing = db.mc_tracing;
const mc_allies = db.mc_allies;
const mc_awards = db.mc_awards;
import { Op } from "sequelize";

export function allAccess(req, res) {
    res.status(200).send("Public Content.");
}

/**
 * Get one user function
 * @param {*} req 
 * @param {*} res 
 */
export function getuser(req, res) {
    let token = req.headers["x-access-token"];
    let tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    User.findOne({
        where: {
            idmask: tokenDecode.idmask
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({
            document: user.document,
            birthdate: user.birthdate,
            goal_amount_1: user.goal_amount_1,
            award_1: user.award_1,
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

/**
 * Get User tracing function
 * @param {*} req
 * @param {*} res
 */
export function getuserTracing(req, res) {
    let token = req.headers["x-access-token"];
    let tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    mc_tracing.findOne({
        where: {
            idmask: tokenDecode.idmask
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        res.status(200).send({
            amount_1: user.amount_1,
            winner_1: user.winner_1,
            date_update: user.date_update,
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}

/**
 * Get User tracing function
 * @param {*} req
 * @param {*} res
 */
export async function getAllies(req, res) {

    const allies = await mc_allies.findAll()
    const alliesDAta = JSON.stringify(allies, null, 2)

    res.status(200).send(allies)
}

/**
 * Get one user function
 * @param {*} req 
 * @param {*} res 
 */
export function getAwards(req, res) {
    let token = req.headers["x-access-token"];
    let tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    User.findOne({
        where: {
            idmask: tokenDecode.idmask
        }
    }).then(async user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        const price = user.award_1 / 1000

        const awards = await mc_awards.findAll({
            where: db.sequelize.where(db.sequelize.col(`s${price}`), { [Op.gt]: 0 })
        })

        res.status(200).send(awards)

    }).catch(err => {
        res.status(500).send({ message: err.message });
    });
}
