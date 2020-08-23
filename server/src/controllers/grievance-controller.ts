import { Request, NextFunction, Response, text } from "express";
import { grievanceFormData, grievance, grievanceDB } from "types";
import { v4 } from "uuid";
import { writeFile } from "utils/fileSystem";

const newGrievance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: grievanceFormData = req.body
        console.log(1)
        const grievances: grievanceDB = require("data/grievances.json")
        console.log(2)
        const id = v4()
        console.log(3)
        const newGrievance: grievance = {
            name: data.name,
            rollno: data.rollno,
            phoneno: data.phoneno,
            email: data.email,
            date: Date.now(),
            resolved: "Not Resolved",
            mode: data.mode,
            audio: req.file ? req.file.originalname : "",
            text: data.text || ""
        }
        console.log(4)
        grievances[id] = newGrievance
        console.log(5)
        await writeFile("data/grievances.json", JSON.stringify(grievances))
        res.status(201).send({ message: `Grievance added with id ${id}` })
    }
    catch (error) {
        console.log(console.error())
        res.status(500).send({ message: "An error" })
    }
}

const validateStudentCredentials = async (req: Request, res: Response, next: NextFunction) => {
    const data: {
        email: string,
        rollno: string
    } = req.body
    console.log(data)
    try {
        const students: { [key: string]: string } = require("data/students.json")
        if ((students[data.rollno.trim()]) === data.email.trim()) {
            res.status(200).send({ message: "Vailid Cridentials" })
        }
        else {
            res.status(422).send({ message: "Invalid Cridentials" })
        }
    }
    catch (err) {
        console.log(err)
        res.status(422).send({ message: "Invalid Cridentials" })
    }
}

export { newGrievance, validateStudentCredentials }