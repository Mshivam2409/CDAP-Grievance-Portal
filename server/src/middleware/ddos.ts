import chalk from "chalk";
import { RequestHandler } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const opts = {
    points: 10, // Number of points
    duration: 1, // Per second(s)
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware: RequestHandler = (req, res, next) => {
    rateLimiter.consume(req.connection.remoteAddress as string)
        .then(() => {
            next();
        })
        .catch((rejRes) => {
            console.log(chalk.red("POSSIBLE DDOS ATTACK!!"))
            res.status(429).send('Too Many Requests');
        });
};

export default rateLimiterMiddleware