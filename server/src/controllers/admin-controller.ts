import { RequestHandler } from "express";
import { CDAPdb, grievancesdb } from "controllers/database";
import chalk from "chalk"
import jwt from "jsonwebtoken"
import { grievance } from "types";
import { unlinkSync } from "fs";

const signIn: RequestHandler = async (req, res, next) => {
    try {
        const data: {
            email: string,
            pwd: string
        } = req.body
        if (CDAPdb.has(data.email.trim()).value()) {
            if (CDAPdb.get(data.email.trim()).value() === data.pwd) {
                const token = jwt.sign(data, "a", {
                    expiresIn: "1h"
                })
                res.status(200).json({ message: "Login Successful", token: token })
            }
            else
                res.status(422).json({ message: "Invalid Credentials" })
        }
        else {
            res.status(422).json({ message: "User not Found" })
        }
    }
    catch (err) {
        console.log(chalk.red(err))
        res.status(500).json({ message: "Sorry , An error occured in the server we could not process your request. Please try again later." })
    }
}

const getGrievances: RequestHandler = async (req, res, next) => {
    try {
        let data
        switch (req.body.required as "top" | "resolved" | "progress" | "not") {
            case "top": {
                data = grievancesdb.sortBy('date').take(10).value()
                break;
            }
            case "resolved": {
                data = grievancesdb.filter({ resolved: "Resolved" }).sortBy('date').value()
                break;
            }
            case "progress": {
                data = grievancesdb.filter({ resolved: "In Progress" }).sortBy('date').value()
                break;
            }
            case "not": {
                data = grievancesdb.filter({ resolved: "Not Resolved" }).sortBy('date').value()
                break;
            }
            default:
                data = []
                break;
        }
        res.status(200).json(data)
    } catch (error) {
        console.log(chalk.red(error))
        res.status(500).json({ message: "Error Gettting Data" })
    }
}

const changeStatus: RequestHandler = async (req, res, next) => {
    try {
        const id = req.body.id
        const status = req.body.status
        let grievance: grievance = grievancesdb.get(id).value()
        grievance.resolved = status
        grievancesdb.set(id, grievance).write()
        if (status === "Resolved" && grievance.mode === "Audio") {
            unlinkSync(process.env.DIR + "/data/audio/" + grievance.audio)
        }
        res.status(201).json({ message: "Status Updated!" })
    } catch (error) {
        console.log(chalk.red(error))
        res.status(500).json({ message: "Unable to Update Status" })
    }
}

export { signIn, getGrievances, changeStatus }