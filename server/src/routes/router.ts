import { Router } from "express";
import bodyParser from "body-parser";
import jwt from "express-jwt"

import upload from "middleware/audio";
import { newGrievance, validateStudentCredentials } from "controllers/grievance-controller";
import { signIn, getGrievances, changeStatus } from "controllers/admin-controller";
import { publicKey } from "auth/keys";

const router = Router()

const jsonParser = bodyParser.json()

router.post("/newGrievance", upload, newGrievance)
router.post("/validate", jsonParser, validateStudentCredentials)
router.post("/signin", jsonParser, signIn)
// Secured Routes!!!
router.get("/secure/validate", jwt({ secret: publicKey, algorithms: ['RS256'] }), (req, res, next) => {
    res.status(200).send({ message: "Valid Token!" })
})
router.post("/secure/getGrievances", jsonParser, jwt({ secret: publicKey, algorithms: ['RS256'] }), getGrievances)
router.post("/secure/changeStatus", jsonParser, jwt({ secret: publicKey, algorithms: ['RS256'] }), changeStatus)

export default router