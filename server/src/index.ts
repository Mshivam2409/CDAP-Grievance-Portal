import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import helmet from "helmet";

dotenv.config();

import router from "routes/router";
import { studentsdb, grievancesdb } from "data/database";

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

app.use(helmet())

app.use("/api", router)

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
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occured!" });
});


app.listen(parseInt(PORT), '0.0.0.0', () => {
    console.log(`Server Listening on Port ${PORT}`);
    try {
        studentsdb.read()
        grievancesdb.read()
        console.log("Database Loaded!")
    } catch (error) {
        console.log("Error Loading Database!")
    }
})

