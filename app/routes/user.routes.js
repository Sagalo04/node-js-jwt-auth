import middleware from "../middleware";
import { allAccess, getuser, getuserTracing, getAllies, getAwards } from "../controllers/user.controller";

export default function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/test/all", allAccess);

    app.get("/api/test/user", [middleware.authJwt.verifyToken], getuser);

    app.get("/api/test/userTracing", [middleware.authJwt.verifyToken], getuserTracing);

    app.get("/api/test/allies", getAllies);

    app.get("/api/test/awards", [middleware.authJwt.verifyToken], getAwards);

};