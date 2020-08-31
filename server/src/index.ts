import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";
import chalk from "chalk"

dotenv.config();

import router from "routes/router";
import { studentsdb, grievancesdb, CDAPdb } from "controllers/database";

const PORT = process.env.PORT || "5000"

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(helmet({
    contentSecurityPolicy: false
}))

app.use("/api", router)

app.use("/secure/data", express.static(process.env.DATABASE_DIR as string))

if (process.env.NODE_ENV === "production") {
    const publicPath = process.env.BUILD_DIRECTORY as string
    app.use(express.static(publicPath));
    app.use("/*", (req, res) => {
        res.sendFile(path.resolve(publicPath + "/index.html"));
    });
}

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }
    if (error.name === 'UnauthorizedError') {
        console.log(chalk.red("Unauthorized Access!"))
        res.status(401).send({ message: "Unauthorized Access!" });
    }
    else {
        res.status(error.code || 500);
        res.json({ message: error.message || "An unknown error occured!" });
    }
});


app.listen(parseInt(PORT), '0.0.0.0', () => {
    console.log(`Server Listening on Port ${chalk.yellow(PORT)}`);
    try {
        studentsdb.read()
        grievancesdb.read()
        CDAPdb
        console.log(chalk.green("Database Loaded!"))
    } catch (error) {
        console.log(chalk.red("Error Loading Database!"))
    }
})

