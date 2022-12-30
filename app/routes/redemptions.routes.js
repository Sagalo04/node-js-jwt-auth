import middleware from "../middleware";
import { postRedemption } from "../controllers/redemptions.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/redemption", [middleware.authJwt.verifyToken], postRedemption);

};