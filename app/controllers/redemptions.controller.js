import db from "../models";
import config from "../config/auth.config";
import { getBlock } from "./commonFunctions"
const User = db.user;
const mc_redemptions = db.mc_redemptions;
const mc_tracing = db.mc_tracing;
const mc_awards = db.mc_awards;
import { Op } from "sequelize";

async function canRedeem(tokenDecode) {
    const tracing = await mc_tracing.findOne({
        where: {
            idmask: tokenDecode.idmask
        }
    })

    const block = await getBlock(tracing);

    const is_winner = tracing[`winner_${block}`]

    const redemption = await mc_redemptions.findOne({
        where: {
            idmask: tracing.idmask,
            block: block
        }
    })

    return (is_winner && !redemption) ? 1 : 0;
}

export async function postRedemption(req, res) {

    let token = req.headers["x-access-token"];
    let tokenDecode = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

    const price = req.body.price / 1000
    console.log(price)

    if (!await canRedeem(tokenDecode)) {
        return res.status(401).send({ message: "No esta Autorizado para redimir este premio" })
    }

    const award = await mc_awards.findOne({
        where: {
            [Op.and]:
                [
                    db.sequelize.where(db.sequelize.col(`s${price}`), { [Op.gt]: 0 }),
                    { id: req.body.id_award }
                ]
        }
    })

    if (award["leal_coins"]) {
        res.status(200).send({ award, "leal": "leal" })
    } else {
        const QuantumRestUrl = process.env.QUANTUM_PREFIX
        let idbono = ""
        const URL = `http://${QuantumRestUrl}.activarpromo.com/api/getproducts.json`
        await fetch(URL, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'user': process.env.QUANTUM_USER,
                'token': process.env.QUANTUM_PASSWORD,
            },
            body: award["id_brand_quantum"] // body data type must match "Content-Type" header
        })
            .then(
                data => data.json()
                    .then(
                        json => {
                            let dataRes = json.response.message

                            dataRes.every(item => {
                                if (item["pvp"] === req.body.price) {
                                    idbono = item["product_id"]
                                    return false;
                                }
                                return true;
                            })
                        }
                    )
            )

            

        // console.log(response)
        // res.status(200).send(response)
    }


    //PENDIENTE VALIDAR PRESUPUESTO
}