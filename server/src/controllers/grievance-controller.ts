import { Request, NextFunction, Response } from "express";
import { grievanceFormData, grievance } from "types";
import { v4 } from "uuid";
import { writeFile } from "utils/fileSystem";

const newGrievance = async (req: Request, res: Response, next: NextFunction) => {
    const data: grievanceFormData = req.body
    const grievance: grievance = {
        id: v4(),
        student: data.student,
        rollno: data.rollno,
        email: data.email,
        resolved: false,
        audio: req.file.filename
    }
    const grievances: Array<grievance> = require("data/grievances.json")
    grievances.push(grievance);
    await writeFile("data/grievances.json", JSON.stringify(grievances))
    res.send({ message: `Grievance added with id ${grievance.id}` })
}

export default newGrievance