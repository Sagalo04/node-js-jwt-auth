import db from "../models";
import config from "../config/auth.config";
const User = db.user;
const mc_redemptions = db.mc_redemptions;

export const getBlock = async (tracing) => {
    let block = 1;
    const CAMPAING_BLOCKS = process.env.CAMPAING_BLOCKS
    for (let i = 1; i <= CAMPAING_BLOCKS; i++) {
        if (tracing[`winner_${i}`]) {
            const redemption = await mc_redemptions.findOne({
                where: {
                    idmask: tracing.idmask,
                    block: i
                }
            })
            if (!redemption) {
                block = i;
                break;
            } else {
                block++;
            }
        }
    }
    return block;
}