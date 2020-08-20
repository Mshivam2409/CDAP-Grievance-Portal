import { Router } from "express";
import upload from "middleware/audio";
import newGrievance from "controllers/grievance-controller";

const router = Router()

router.post("/newGrievance/", upload, newGrievance)

router.get("*", () => {
    console.log("1")
})

export default router