import { Router } from "express";
import bodyParser from "body-parser";

import upload from "middleware/audio";
import { newGrievance, validateStudentCredentials } from "controllers/grievance-controller";

const router = Router()

const jsonParser = bodyParser.json()

router.post("/newGrievance", upload, newGrievance)
router.post("/validate", jsonParser, validateStudentCredentials)

export default router